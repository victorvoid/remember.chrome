const webpack =  require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const PROD = JSON.parse(process.env.PROD_ENV === 'production')

module.exports = {
  entry: './src/Remember.js',
  output: {
    filename: PROD ? 'dist/remember.chrome.min.js' : 'dist/remember.chrome.js',
    library: 'remember.chrome',
    libraryTarget: 'umd'
  },
  plugins: PROD ? [
    new UglifyJSPlugin()
  ] : [],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
