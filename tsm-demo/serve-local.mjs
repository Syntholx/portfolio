import http from 'node:http';
import { readFile } from 'node:fs/promises';

// Expose only UI assets, never .git, secrets or arbitrary workspace files.
const files = new Map([
  ['/tsm-demo/local.html', ['local.html', 'text/html; charset=utf-8']],
  ['/tsm-demo/local.js', ['local.js', 'text/javascript; charset=utf-8']],
  ['/tsm-demo/local.css', ['local.css', 'text/css; charset=utf-8']],
  ['/tsm-demo/demo.css', ['demo.css', 'text/css; charset=utf-8']],
  ['/tsm-demo/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/tsm-demo/demo.js', ['demo.js', 'text/javascript; charset=utf-8']]
]);
const server = http.createServer(async (request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405).end(); return;
  }
  if (path === '/') {
    response.writeHead(302, { Location: '/tsm-demo/local.html' }).end(); return;
  }
  const asset = files.get(path);
  if (!asset) { response.writeHead(404).end('Not found'); return; }
  try {
    const content = await readFile(new URL(asset[0], import.meta.url));
    response.writeHead(200, {
      'Content-Type': asset[1], 'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch { response.writeHead(500).end('Cannot load UI asset'); }
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE'
    ? 'Port 5500 is occupied. Stop the previous local server first.'
    : 'Cannot start the local server.');
  process.exitCode = 1;
});
server.listen(5500, '127.0.0.1', () => {
  console.log('Local: http://127.0.0.1:5500/tsm-demo/local.html');
});
