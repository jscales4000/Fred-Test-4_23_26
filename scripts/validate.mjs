import { existsSync, readFileSync } from 'fs';

const requiredFiles = [
  'public/cr-com-lib.js',
  'public/ch5-components.js',
  'public/appui/manifest',
  'contracts/CodexClass.cce',
  'docs/SIGNAL-MAP.md'
];

const missing = requiredFiles.filter((file) => !existsSync(file));

if (missing.length > 0) {
  console.error('[validate] Missing required files:');
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

const indexHtml = readFileSync('index.html', 'utf8');
if (!indexHtml.includes('cr-com-lib.js') || !indexHtml.includes('ch5-components.js')) {
  console.error('[validate] index.html is missing Crestron runtime script tags.');
  process.exit(1);
}

const contractDoc = readFileSync('docs/SIGNAL-MAP.md', 'utf8');
if (!contractDoc.includes('CodexClass.Display1PcSelect') || !contractDoc.includes('CodexClass.MasterMuteToggle')) {
  console.error('[validate] Signal map document does not include the expected CodexClass contract names.');
  process.exit(1);
}

console.log('[validate] CodexClass CH5 project structure looks correct.');
