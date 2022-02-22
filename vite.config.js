const { defineConfig } = require('vite')
const reactRefresh = require('@vitejs/plugin-react-refresh')
const path = require("path")

const { VitePWA } = require('vite-plugin-pwa')


// markdown file to js convert
// function myPlugin(){
//   const fileMatch = /\.(md)/
//   return {
//     name: "my-md-file",
//     transform(src, id){
//       if(fileMatch.test(id)){
//         return {
//           code: `
//             export default { text: ${JSON.stringify(src)}}
//           `,
//           map: null
//         }
//       }
//     }
//   }
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    VitePWA({
      workbox: {
        cleanupOutdatedCaches: false
      },
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Name of your app',
        short_name: 'Short name of your app',
        description: 'Description of your app',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
    })
    // myPlugin()
  ],
  server: {
    port: 5500,
    // host: "0.0.0.0"
  },
  // base: "/my-blog/",
  build: {
    // outDir: "build"
  },
  resolve: {
    alias: {
      "app": path.resolve(__dirname, "./src"),
      "src": path.resolve(__dirname, "./src"),
      "apis": path.resolve(__dirname, "./src/apis"),
      "scss": path.resolve(__dirname, "./src/styles"),
      "store": path.resolve(__dirname, "./src/store"),
      "actions": path.resolve(__dirname, "./src/store/actions"),
      "reducers": path.resolve(__dirname, "./src/store/reducers"),
      "pages": path.resolve(__dirname, "./src/pages"),
      "components": path.resolve(__dirname, "./src/components"),
      "UI": path.resolve(__dirname, "./src/components/UI")
    }
  }
})
