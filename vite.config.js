const { defineConfig } = require('vite')
const reactRefresh = require('@vitejs/plugin-react-refresh')
const path = require("path")

// markdown file to js convert
function myPlugin(){
  const fileMatch = /\.(md)/
  return {
    name: "my-md-file",
    transform(src, id){
      if(fileMatch.test(id)){
        return {
          code: `
            export default { text: ${JSON.stringify(src)}}
          `,
          map: null
        }
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    myPlugin()
  ],
  server: {
    port: 5500,
    // host: "0.0.0.0"
  },
  base: "/my-blog/",
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
