/**
 * Harold P. Mallorca — Portfolio Studio Server
 * Lightweight Local Administration Server with Git Publishing Engine.
 * Zero external dependencies (uses native Node.js http, fs, path, child_process).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const DATA_FILE = path.join(ROOT_DIR, 'portfolio-data.json');
const INDEX_FILE = path.join(ROOT_DIR, 'index.html');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.md': 'text/markdown; charset=UTF-8'
};

function runGitCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: ROOT_DIR }, (error, stdout, stderr) => {
      if (error) {
        // Some git commands like 'git commit' with no changes return exit code 1
        return resolve({ success: false, error: error.message, stdout, stderr });
      }
      resolve({ success: true, stdout, stderr });
    });
  });
}

function updateIndexHtmlFromData(data) {
  if (!fs.existsSync(INDEX_FILE)) return;
  try {
    let html = fs.readFileSync(INDEX_FILE, 'utf-8');
    const p = data.profile || {};
    const c = data.contacts || {};

    if (p.name) {
      html = html.replace(/<title>.*?<\/title>/, `<title>${p.name} | ${p.role || 'Developer'}</title>`);
      html = html.replace(/<meta name="author" content=".*?">/, `<meta name="author" content="${p.name}">`);
      html = html.replace(/(data-field="profile-name">)[^<]*(<\/)/g, `$1${p.name}$2`);
    }

    if (p.role) {
      html = html.replace(/(data-field="profile-role">)[^<]*(<\/)/g, `$1${p.role}$2`);
    }

    if (p.employmentTitle) {
      html = html.replace(/(data-field="profile-employmentTitle">)[^<]*(<\/)/g, `$1${p.employmentTitle}$2`);
    }

    if (p.office) {
      html = html.replace(/(data-field="profile-office">)[^<]*(<\/)/g, `$1${p.office}$2`);
    }

    if (p.status) {
      html = html.replace(/(data-field="profile-status">)[^<]*(<\/)/g, `$1${p.status}$2`);
    }

    if (p.focusQuote) {
      html = html.replace(
        /<meta name="description" content=".*?">/,
        `<meta name="description" content="Portfolio of ${p.name || 'Harold P. Mallorca'} — ${p.role || 'Developer'} &amp; ${p.employmentTitle || 'Systems Administrator Assistant'} specializing in ${p.focusQuote}">`
      );
      html = html.replace(/(data-field="profile-focusQuote">)[^<]*(<\/)/g, `$1${p.focusQuote}$2`);
    }

    if (c.phone) {
      html = html.replace(/(data-field="contact-phone">)[^<]*(<\/)/g, `$1${c.phone}$2`);
      html = html.replace(/href="tel:[^"]*"/g, `href="tel:${c.phone}"`);
    }

    if (c.facebook) {
      html = html.replace(/href="https:\/\/www\.facebook\.com\/[^"]*"/g, `href="${c.facebook}"`);
      const fbHandle = c.facebook.replace(/^https?:\/\/(www\.)?facebook\.com\/?/, 'facebook.com/');
      html = html.replace(/(data-field="contact-facebook-text">)[^<]*(<\/)/g, `$1${fbHandle}$2`);
    }

    if (c.email) {
      html = html.replace(/(data-field="contact-email">)[^<]*(<\/)/g, `$1${c.email}$2`);
      html = html.replace(/href="mailto:[^"]*"/g, `href="mailto:${c.email}"`);
    }

    fs.writeFileSync(INDEX_FILE, html, 'utf-8');
  } catch (err) {
    console.error('Failed to update index.html directly:', err);
  }
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // Enable CORS for local cross-origin previews if needed
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // --- API ROUTES ---

  // 1. GET /api/data
  if (pathname === '/api/data' && req.method === 'GET') {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(data);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Data file not found' }));
    }
  }

  // 2. POST /api/save
  if (pathname === '/api/save' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
        updateIndexHtmlFromData(data);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
          success: true,
          message: 'Portfolio data saved successfully to portfolio-data.json and index.html',
          timestamp: new Date().toISOString()
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // 3. POST /api/publish
  if (pathname === '/api/publish' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        let commitMsg = 'update: portfolio content via Studio UI';
        try {
          const parsed = JSON.parse(body || '{}');
          if (parsed.message) commitMsg = parsed.message;
        } catch (_) {}

        const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
        const fullMsg = `${commitMsg} (${now})`;

        // Step 1: git add .
        const addRes = await runGitCommand('git add .');

        // Step 2: git commit
        const commitRes = await runGitCommand(`git commit -m "${fullMsg.replace(/"/g, '\\"')}"`);

        // Step 3: git push origin main
        const pushRes = await runGitCommand('git push origin main');

        // Step 4: git status & commit hash
        const statusRes = await runGitCommand('git status -s');
        const hashRes = await runGitCommand('git rev-parse --short HEAD');

        const success = pushRes.success || (!commitRes.success && commitRes.stdout.includes('nothing to commit'));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
          success,
          commitHash: (hashRes.stdout || '').trim(),
          commitMessage: fullMsg,
          logs: {
            add: addRes.stdout + addRes.stderr,
            commit: commitRes.stdout + commitRes.stderr,
            push: pushRes.stdout + pushRes.stderr,
            status: statusRes.stdout
          },
          liveUrl: 'https://hrolds.github.io/',
          timestamp: now
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // 4. GET /api/git-status
  if (pathname === '/api/git-status' && req.method === 'GET') {
    try {
      const statusRes = await runGitCommand('git status -s');
      const branchRes = await runGitCommand('git branch --show-current');
      const logRes = await runGitCommand('git log -n 1 --oneline');
      const remoteRes = await runGitCommand('git remote -v');

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        clean: !statusRes.stdout.trim(),
        branch: (branchRes.stdout || '').trim(),
        lastCommit: (logRes.stdout || '').trim(),
        remote: (remoteRes.stdout || '').trim(),
        statusText: statusRes.stdout || 'Clean working tree'
      }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  // 5. GET /api/images
  if (pathname === '/api/images' && req.method === 'GET') {
    const imagesDir = path.join(ROOT_DIR, 'images');
    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir)
        .filter(f => /\.(png|jpg|jpeg|svg|gif|webp)$/i.test(f))
        .map(f => `images/${f}`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(files));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify([]));
    }
  }

  // --- STATIC FILE SERVING ---
  let filePath = path.join(ROOT_DIR, pathname === '/' ? 'index.html' : pathname);

  // Prevent path traversal
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Access Denied');
  }

  // If path is a directory, serve index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    return res.end(content);
  }

  // 404 Fallback
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
  res.end(`File not found: ${pathname}`);
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Harold P. Mallorca — Portfolio Studio Server Online!`);
  console.log(`=======================================================`);
  console.log(`🌐 Live Portfolio: http://localhost:${PORT}/`);
  console.log(`⚡ Portfolio Studio (Admin UI): http://localhost:${PORT}/admin.html`);
  console.log(`📡 Connected Git Remote: https://github.com/Hrolds/Hrolds.github.io.git`);
  console.log(`=======================================================\n`);
});
