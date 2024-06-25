import { defineConfig, loadEnv } from 'vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import dynamicImport from 'vite-plugin-dynamic-import'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const manifestForPlugin: Partial<VitePWAOptions> = {
  strategies: 'injectManifest',
  srcDir: '.',
  filename: 'sw.js',
  registerType: 'autoUpdate',
  useCredentials: true,
  includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
  manifest: {
    name: 'Example App Shell of Single SPA',
    short_name: 'Example App Shell',
    display: 'standalone',
    background_color: '#6841F3',
    theme_color: '#6841F3',
    scope: '/',
    start_url: '/',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    root: './src',
    publicDir: 'assets',
    define: {
      'process.env': env
    },
    server: {
      port: 8000
    },
    build: {
      outDir: '../dist',
      assetsDir: 'assets',
      cssCodeSplit: false,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: './src/index.html',
          'app-shell': './src/app-shell.ts'
        },
        output: {
          format: 'module',
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name].[ext]',
          globals: {
            'single-spa': 'singleSpa',
            'single-spa-layout': 'singleSpaLayout'
          }
        },
        preserveEntrySignatures: 'strict',
        external: ['single-spa', 'single-spa-layout']
      }
    },
    plugins: [
      ViteEjsPlugin((config) => ({
        isLocal: config.mode === 'development',
        env
      })),
      mode === 'development' ? null : dynamicImport(),
      VitePWA(manifestForPlugin)
    ]
  }
})
