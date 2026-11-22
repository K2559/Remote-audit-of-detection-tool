import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const output = process.argv[2];
if (!output) throw new Error('Specify the output HTML file.');

const root = new URL('../web/csv/', import.meta.url);
const [html, css, bundle] = await Promise.all([
  readFile(new URL('index.html', root), 'utf8'),
  readFile(new URL('style.css', root), 'utf8'),
  build({
    entryPoints: [fileURLToPath(new URL('app.mjs', root))],
    bundle: true,
    format: 'esm',
    write: false,
  }),
]);

const stylesheetTag = '<link rel="stylesheet" href="./style.css">';
const scriptTag = '<script type="module" src="./app.mjs"></script>';
if (!html.includes(stylesheetTag) || !html.includes(scriptTag)) {
  throw new Error('The audit page entry tags could not be found.');
}
if (/<\/style/i.test(css)) throw new Error('The audit stylesheet contains an HTML closing style tag.');

// Publish one document so caches cannot mix the audit markup and scripts from different deploys.
const page = html.replace(stylesheetTag, () => '<style>\n' + css + '</style>')
  .replace(scriptTag, () => '<script type="module">\n' + bundle.outputFiles[0].text + '</script>');
await writeFile(output, page);
