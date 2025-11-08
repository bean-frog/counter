const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, 'build'); // CRA build output
const distDir = path.resolve(__dirname, 'dist');

function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

removeDir(distDir);
ensureDir(distDir);

const indexSrc = path.join(buildDir, 'index.html');
const indexDest = path.join(distDir, 'index.html');
let html = fs.readFileSync(indexSrc, 'utf-8');


const cssDir = path.join(buildDir, 'static/css');
const jsDir = path.join(buildDir, 'static/js');

const cssFiles = fs.existsSync(cssDir) ? fs.readdirSync(cssDir).filter(f => f.endsWith('.css')) : [];
const jsFiles = fs.existsSync(jsDir) ? fs.readdirSync(jsDir).filter(f => f.endsWith('.js')) : [];

for (const file of cssFiles) {
  fs.copyFileSync(path.join(cssDir, file), path.join(distDir, file));
}
for (const file of jsFiles) {
  fs.copyFileSync(path.join(jsDir, file), path.join(distDir, file));
}

// Update paths in index.html
html = html
  .replace(/\/static\/css\/([a-zA-Z0-9_\-\.]+\.css)/g, './$1')
  .replace(/\/static\/js\/([a-zA-Z0-9_\-\.]+\.js)/g, './$1');

fs.writeFileSync(indexDest, html, 'utf-8');

console.log('/dist prepared successfully!');
console.log(`Files:`);
console.log(`- index.html`);
cssFiles.forEach(f => console.log(`- ${f}`));
jsFiles.forEach(f => console.log(`- ${f}`));
