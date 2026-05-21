import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(
  'c:/strato/project/starbanking/workspace/design-system/src/components/Icon/Icon.tsx',
  'utf8',
);

const pathsBlock = src.match(/const PATHS[\s\S]*?= \{([\s\S]*?)\n\};/);
if (!pathsBlock) throw new Error('PATHS block not found');

const body = pathsBlock[1].replace(/\/\*[\s\S]*?\*\//g, '');
const entries = [];
const re = /^\s+(\w+):\s*([\s\S]*?)(?=^\s+\w+:|^\s*\})/gm;
let m;
while ((m = re.exec(body)) !== null) {
  entries.push([m[1], m[2].trim().replace(/,\s*$/, '')]);
}

function jsxToSvg(jsx) {
  return jsx
    .replace(/<>|<\/>/g, '')
    .replace(/strokeLinecap/g, 'stroke-linecap')
    .replace(/strokeLinejoin/g, 'stroke-linejoin')
    .replace(/strokeWidth/g, 'stroke-width');
}

const outLines = [
  "import type { IconName } from './types';",
  '',
  'export const ICON_PATHS: Record<IconName, string> = {',
];

for (const [name, jsx] of entries) {
  const svg = jsxToSvg(jsx).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  outLines.push(`  ${name}: \`${svg}\`,`);
}
outLines.push('};', '');

const outDir = path.join(__dirname, '../src/components/Icon');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'iconPaths.ts'), outLines.join('\n'));
console.log('Generated', entries.length, 'icons', entries.map((e) => e[0]).join(', '));
