const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
module.exports = {
  mode: 'development',
  entry: {
    server: './src/server/server.ts',
  },
  output: {
    path: path.join(__dirname, '../', 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  target: 'node',
  // node: {
  //     // Need this when working with express, otherwise the build fails
  //     __dirname: false, // if you don't put this is, __dirname
  //     __filename: false // and __filename return blank or /
  // },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: {
    //       loader: 'babel-loader',
    //     },
    //   },
    {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
}
