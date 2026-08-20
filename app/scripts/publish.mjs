// Copies the Vite build to the repository root so GitHub Pages can serve the
// site straight from `main` / `root`, then checks that the essentials landed.
// Only the generated entries are touched; the source project and the reference
// pack are left alone.
import { cp, rm, readdir, access, writeFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const root = fileURLToPath(new URL('../../', import.meta.url))

// Anything the build can emit at the root. Removed first so old hashed bundles
// never accumulate next to the new ones.
const generated = ['assets', 'images', 'index.html', '404.html', '.nojekyll']
await Promise.all(generated.map((entry) => rm(`${root}${entry}`, { recursive: true, force: true })))

for (const entry of await readdir(dist)) {
  await cp(`${dist}${entry}`, `${root}${entry}`, { recursive: true })
}

// GitHub Pages runs Jekyll by default, which skips paths starting with an
// underscore. `.nojekyll` turns that off so every built asset is published.
await writeFile(`${root}.nojekyll`, '')

const required = ['index.html', '404.html', '.nojekyll', 'images/laura-portrait.jpg']
for (const file of required) {
  await access(`${root}${file}`)
}
console.log(`published to repository root: ${required.join(', ')}, assets/`)
