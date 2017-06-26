const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        loaders: ['babel-loader'],
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}
