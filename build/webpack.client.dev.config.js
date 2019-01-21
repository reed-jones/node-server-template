const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const { VueLoaderPlugin } = require('vue-loader')

const baseConfig = require('./webpack.base.dev.config')
require('dotenv').config()

const { APP_NAME = 'Default App Name' } = process.env

let devMode = baseConfig.mode !== 'production'
// console.log(baseConfig)
module.exports = merge(baseConfig, {
  entry: [
    // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/client/index.js',
  ],
  output: {
    path: path.join(__dirname, '../', 'dist', 'public'),
    publicPath: '/',
    filename: devMode ? '[name].js' : '[name].[hash].js',
  },
  target: 'web',
  devtool: devMode ? '#source-map' : false,

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          },
        },
      },
      // {
      //   test: /\.tsx?$/,
      //   loader: 'ts-loader',
      //   exclude: /node_modules/,
      //   options: {
      //     appendTsSuffixTo: [/\.vue$/],
      //   },
      // },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
          }, {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            }
          }
        ]
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
        test: /\.styl(us)?$/,
        use: [
          {
            // loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            loader:'vue-style-loader',
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
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['raw-loader', 'pug-plain-loader'],
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
  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
},
  plugins: [
    new VueLoaderPlugin(),
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
  new webpack.NoEmitOnErrorsPlugin()
  ],
})