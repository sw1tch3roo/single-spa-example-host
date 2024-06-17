import { defineConfig, loadEnv, UserConfigExport } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const config: UserConfigExport = {
    define: {
      'process.env': env
    },
    base: './',
    server: {
      port: 8000
    },
    build: {
      rollupOptions: {
        input: {
          index: './index.html',
          'root-config': './src/main.ts'
        },
        output: {
          format: 'system',
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name][ext]',
          globals: {
            'single-spa': 'singleSpa',
            'single-spa-layout': 'singleSpaLayout'
          }
        },
        preserveEntrySignatures: 'strict',
        external: ['single-spa', 'single-spa-layout']
      }
    }
  }

  return config
})
