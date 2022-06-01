import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import viteMarkdown from 'vite-plugin-md';

export default defineConfig({
  plugins: [vue({
    include: [/\.vue$/, /\.md$/],
  }), viteMarkdown()],

  resolve: {
    alias: [{
      find: '@', replacement: resolve(__dirname, 'src'),
    }],
  },
})
