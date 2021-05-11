const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.bundle.js",
  },
  resolve: { 
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: path.join(__dirname, "./src"),
    watchContentBase: true,
    open: true,
    port: 9000,
  },
  module: {
    rules: [
      { 
          test: /\.(js|jsx)$/,
          exclude: /node_modules/, 
          use: ["babel-loader"] 
      },
      {
          test: /\.(css|scss)$/,
          use: ["style-loader", "css-loader", "sass-loader"],
      },
      { 
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ["file-loader"] 
      },
  ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html")
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],
}
