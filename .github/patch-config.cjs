const fs = require('fs');
const repo = process.env.REPO_NAME;
const owner = process.env.OWNER;
let cfg = fs.readFileSync('astro.config.mjs', 'utf8');
cfg = cfg.replace(/const SITE_OVERRIDE = '[^']*';/, `const SITE_OVERRIDE = 'https://${owner}.github.io';`);
cfg = cfg.replace(/const BASE_PATH = '[^']*';/, `const BASE_PATH = '/${repo}';`);
fs.writeFileSync('astro.config.mjs', cfg);
console.log('--- patched astro.config.mjs ---');
console.log(cfg);
