const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
require('dotenv').config()

const { APP_ENV = 'production', APP_NAME = 'Default App Name' } = process.env

let devMode = APP_ENV !== 'production'

module.exports = {
  mode: APP_ENV,
  entry: {
    main: './src/client/index.ts',
  },
  output: {
    path: path.join(__dirname, '../', 'dist', 'public'),
    publicPath: '/',
    filename: devMode ? '[name].js' : '[name].[hash].js',
  },
  target: 'web',
  devtool: devMode ? '#source-map' : false,
  stats: {
    // decrease noise in build output
    children: false,
  },
  module: {
    rules: [
      // Vanilla JavaScript option
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   use: [
        //     {
        //       loader: 'babel-loader',
        //     },
        //   ],
        // },

    //   TypeScript Option
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },

      // plain HTML
      //   {
      //     test: /\.html$/,
      //     exclude: /node_modules/,
      //     use: [
      //       {
      //         loader: 'html-loader',
      //         options: { minimize: true },
      //       },
      //     ],
      //   },

      // Pug Templating
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'pug-loader',
          },
        ],
      },

      // Stylesheets
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
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
        exclude: /node_modules/,
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

      // Images
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
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
      template: '!!pug-loader!./src/client/index.pug',
      production: APP_ENV === 'production',
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
}
