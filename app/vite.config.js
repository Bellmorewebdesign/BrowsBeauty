import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base: './'` keeps every asset reference relative, so the built site works
// from a GitHub Pages project page (user.github.io/RepoName/), a user page, or
// a custom domain without any further configuration. The build lands in
// `app/dist` and `scripts/publish.mjs` copies it to the repository root, which
// is what GitHub Pages serves when it is pointed at `main` / `root`.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: false,
    target: 'es2019',
  },
  server: { port: 5173, open: false },
})
