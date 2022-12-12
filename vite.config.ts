import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import visualizer from "rollup-plugin-visualizer";
import importToCDN from 'vite-plugin-cdn-import'
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      visualizer(),
      importToCDN({
        modules:[
          {
            name: 'vue',
            var: 'Vue',
            path: `https://cdn.bwpow.com/vue@3.min.js`,
          },
          {
            name: 'axios',
            var: 'axios',
            path: `https://cdn.bwpow.com/axios@1.2.0.min.js`,
          },
          {
            name: 'vue-router',
            var: 'VueRouter',
            path: 'https://cdn.bwpow.com/vue-router@4.1.6.min.js'
          },
          // {
          //   name: 'vuetify',
          //   var: 'vuetify',
          //   path: 'https://cdn.bwpow.com/vuetify@3.0.3.min.js'
          // },
        ]
      }),
  ],
  server: {
    open: true,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
})
