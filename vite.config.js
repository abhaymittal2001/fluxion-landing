import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// On GitHub Pages the site is served from /<repo>/, so use a subpath base for
// production builds while keeping `/` for local dev (and the preview server).
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/fluxion-landing/' : '/',
  plugins: [react()],
}))
