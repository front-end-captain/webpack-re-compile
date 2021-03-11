const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

const { loadAndSetEnv, resolveClientEnv } = require("./loadAndSetEnv");

loadAndSetEnv(__dirname, "development", "serve");

const injectedClientEnv = resolveClientEnv();

console.log("injectedClientEnv", injectedClientEnv);

const BUILD_PATH = path.resolve(__dirname, "./../build");
const ASSETS_PATH = "/assets/";

module.exports = {
  config: {
    mode: "development",
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
      path: BUILD_PATH,
      filename: "[name]-[hash:8].js",
      publicPath: ASSETS_PATH,
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: "react-app",
        template: path.resolve(__dirname, "./index.html"),
      }),
      new webpack.DefinePlugin(injectedClientEnv)
    ],
  },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    clientLogLevel: "info",
    historyApiFallback: {
      index: ASSETS_PATH + "index.html",
    },
    contentBase: BUILD_PATH,
    watchContentBase: true,
    hot: true,
    compress: true,
    publicPath: ASSETS_PATH,
    overlay: { warnings: false, errors: true },
    https: false,
    open: false,
    stats: {
      version: true,
      timings: true,
      colors: true,
      modules: false,
      children: false,
    },
  },
};
