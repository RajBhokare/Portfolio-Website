import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/leetcode': {
        target: 'https://leetcode.com/graphql',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/leetcode/, ''),
        headers: {
          'Referer': 'https://leetcode.com',
          'Origin': 'https://leetcode.com',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      },
    },
  },
})
