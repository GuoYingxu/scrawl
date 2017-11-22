const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    scrawl: "./src/index.js",
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: path.join(__dirname, 'src'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist')
  }
}