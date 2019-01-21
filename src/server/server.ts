import '@babel/polyfill'
import router from '@server/routes'
import Koa from 'koa'
const logger = require('koa-logger')

import { enableHMR, staticFiles } from './middleware'

const {
  APP_ENV = 'production',
  APP_HMR = false,
  APP_PORT = 3000,
  APP_URL = 'http://localhost',
} = process.env


const app = new Koa()
app.use(logger())

if (APP_ENV !== 'production' && ['true', true].includes(APP_HMR)) {
  console.log('enabling hot module reloading')
  enableHMR(app)
}

// serve dist/public as static files
app.use(staticFiles({ root: 'dist/public', debug: true }))

// koa-router middleware
app.use(router.routes())
app.use(router.allowedMethods())

// listen on port
const server = app.listen(APP_PORT)

if (APP_ENV !== 'production') {
  // tslint:disable-next-line:no-console
  console.log(`Now listening on port: ${APP_URL}:${APP_PORT}`)
}

export default server
