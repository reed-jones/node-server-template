import '@babel/polyfill'
import router from '@server/routes'
import Koa from 'koa'

import { enableHMR, staticFiles } from './middleware'

const {
  APP_ENV = 'production',
  APP_HMR = false,
  APP_PORT = 3000,
  APP_URL = 'http://localhost',
} = process.env

const server = async () => {
  const app = new Koa()

  if (APP_ENV !== 'production' && ['true', true].includes(APP_HMR)) {
    enableHMR(app)
  }

  // serve dist/public as static files
  app.use(staticFiles({ root: 'dist/public', debug: true }))

  // koa-router middleware
  app.use(router.routes())
  app.use(router.allowedMethods())

  // listen on port
  app.listen(APP_PORT)

  if (APP_ENV !== 'production') {
    // tslint:disable-next-line:no-console
    console.log(`Now listening on port: ${APP_URL}:${APP_PORT}`)
  }
}
server()
