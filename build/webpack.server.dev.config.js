const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.dev.config')

let devMode = baseConfig.mode !== 'production'

module.exports = merge(baseConfig, {
  entry: {
    server: './src/server/server.ts',
  },
  output: {
    path: path.join(__dirname, '../', 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
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
    ]
  }
})
