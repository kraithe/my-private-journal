const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SRC_DIR = path.join(__dirname, '/client');
const DIST_DIR = path.join(__dirname, '/dist');

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  devServer: {
    contentBase: DIST_DIR
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};