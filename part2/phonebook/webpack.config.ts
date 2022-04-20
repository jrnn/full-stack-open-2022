import configure from "@config/webpack-config"
import path from "path"

export default configure({
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    proxy: {
      "/api": "http://localhost:3001"
    }
  }
})
