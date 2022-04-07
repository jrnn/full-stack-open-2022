const path = require("path")
const DotenvWebpackPlugin = require("dotenv-webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      "..."
    ]
  },
  devtool: "inline-source-map",
  devServer: {
    compress: true,
    port: 8080,
    static: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: "/node_modules/",
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    new DotenvWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}
