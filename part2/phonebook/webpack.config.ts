import { Configuration } from "webpack"
import { Configuration as DevServerConfiguration } from "webpack-dev-server"
import path from "path"
import HTMLWebpackPlugin from "html-webpack-plugin"

const config: Configuration = {
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
    new HTMLWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}

const devConfig: Configuration = {
  ...config,
  devtool: "inline-source-map",
  devServer: {
    compress: true,
    port: 8080,
    proxy: {
      "/api": "http://localhost:3001"
    },
    static: path.resolve(__dirname, "dist")
  } as DevServerConfiguration
}

const prodConfig: Configuration = {
  ...config,
  output: {
    ...config.output,
    filename: "main.[contenthash:8].js",
    chunkFilename: "main.[contenthash:8].chunk.js"
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
}

const getConfig = (_: unknown, { mode }: Record<string, unknown>): Configuration => {
  return mode === "production"
    ? prodConfig
    : devConfig
}

export default getConfig
