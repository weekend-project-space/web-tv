import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/translate': {
        target: 'http://fanyi.youdao.com/translate',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/translate/, '')
      }
    }
  },
})