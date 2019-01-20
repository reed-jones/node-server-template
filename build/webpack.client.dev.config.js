const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.dev.config')
require('dotenv').config()

const { APP_NAME = 'Default App Name' } = process.env

let devMode = baseConfig.mode !== 'production'
// console.log(baseConfig)
module.exports = merge(baseConfig, {
  entry: [
    // 'webpack-hot-middleware/client?reload=true&path=__webpack_hmr',
    'webpack-hot-middleware/client?reload=true',
    './src/client/index.ts'
  ],
  output: {
    path: path.join(__dirname, '../', 'dist', 'public'),
    publicPath: '/',
    filename: devMode ? '[name].js' : '[name].[hash].js',
  },
  target: 'web',
  devtool: devMode ? '#source-map' : false,
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   compress: true,
  //   port: 9000
  // },

  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   watchContentBase: true,
  //   hot: true,
  // },

  // devServer: {
  //   contentBase: path.resolve(__dirname, 'src', 'client'),
  //   publicPath: path.resolve(__dirname, 'dist', 'public'),
  // },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },

      // Stylesheets
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'stylus-loader', // compiles Stylus to CSS
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'raw-loader',
          },
          {
            loader: 'pug-plain-loader',
          },
        ],
      },

      // Images
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/client/index.pug',
      filename: 'index.html',
      // global variables available within pug templates
      templateParameters: {
        APP_NAME,
      },
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
  ],
})
