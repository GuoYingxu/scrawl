const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    scrawl: "./src/index.js",
    test: "./test/test.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./test/index.html"
    })
  ],
  devServer: {
    contentBase: './dist'
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}