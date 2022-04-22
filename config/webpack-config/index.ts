import { Configuration } from "webpack"
import { Configuration as DevServerConfiguration } from "webpack-dev-server"
import merge from "webpack-merge"
import path from "path"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import HTMLWebpackPlugin from "html-webpack-plugin"

const baseConfig: Configuration = {
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
      template: path.resolve(__dirname, "index.html")
    })
  ]
}

const devConfig: Configuration = {
  mode: "development",
  output: {
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 8080
  } as DevServerConfiguration
}

const prodConfig: Configuration = {
  mode: "production",
  output: {
    filename: "main.[contenthash:8].js",
    chunkFilename: "main.[contenthash:8].chunk.js"
  },
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}

export default (options: Configuration) => (_: unknown, { mode }: Record<string, unknown>): Configuration => {
  const envConfig = mode === "production"
    ? prodConfig
    : devConfig

  return merge(baseConfig, envConfig, options)
}
