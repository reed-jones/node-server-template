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
  stats: {
    // decrease noise in build output
    children: true,
  },
}
