import configure from "@config/webpack-config"
import path from "path"
import DotenvWebpackPlugin from "dotenv-webpack"

export default configure({
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new DotenvWebpackPlugin()
  ]
})
