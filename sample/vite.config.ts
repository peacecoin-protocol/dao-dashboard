import { defineConfig, createLogger, type LogLevel } from 'vite'
import react from '@vitejs/plugin-react'

const logger = createLogger()
const originalInfo = logger.info.bind(logger)

logger.info = (msg, options) => {
  // Hide noisy HMR lines when files change during dev (not errors).
  if (typeof msg === 'string' && msg.includes('hmr update')) {
    return
  }
  originalInfo(msg, options)
}

export default defineConfig({
  customLogger: logger,
  logLevel: 'info' as LogLevel,
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
