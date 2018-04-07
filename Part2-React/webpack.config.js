const webpack = require('webpack');
const path = require('path');
/* helps to Work with Directories and Paths */
var OpenBrowserPlugin = require('open-browser-webpack-plugin')
const sourcePath = path.join(__dirname, './client'); // Load files into webpack
const distPath = path.join(__dirname, './dist'); // folder to put the bundle created by webpack

var webpackConfig = {
  entry: {
    app: './client/index.js',
  },
  devtool: 'eval-source-map',
  devServer: {
    inline: true,
    contentBase: './client',
    port: 3000,
    hot:true,
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|html)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new OpenBrowserPlugin({
      url: 'http://localhost:3000'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = webpackConfig
