// import path from 'path'
// import express from 'express'
// const app = express(),
//             DIST_DIR = __dirname,
//             HTML_FILE = path.join(DIST_DIR, 'index.html')
// app.use(express.static(DIST_DIR))
// app.get('*', (req, res) => {
//     res.sendFile(HTML_FILE)
// })
// const PORT = process.env.PORT || 8080
// app.listen(PORT, () => {
//     console.log(`App listening to ${PORT}....`)
//     console.log('Press Ctrl+C to quit.')
// })

import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
var router = new Router()

const {
  APP_ENV = 'production',
  APP_PORT = 3000,
  APP_URL = 'http://localhost',
} = process.env

app.use(async (ctx: any) => {
  ctx.body = 'Hello World'
})

app.listen(APP_PORT)

console.log(`Now listening on port: ${APP_URL}:${APP_PORT}`)
