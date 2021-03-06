const path = require('path')
require('dotenv').config()

const { APP_ENV = 'production' } = process.env

module.exports = {
  mode: APP_ENV,
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@client': path.resolve(__dirname, '../src/client'),
      '@server': path.resolve(__dirname, '../src/server'),
    },
  },

  // disable terminal logging
  // stats: 'minimal',
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: true,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: false,
    warnings: true,
    publicPath: false
  }
}
