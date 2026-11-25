import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the project site from a subpath (/kawaiidesu/),
// while Vercel, Netlify and local dev serve from the root (/).
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  base: isGitHubPages ? '/kawaiidesu/' : '/',
  plugins: [react()],
  server: { port: 5173, open: false },
})