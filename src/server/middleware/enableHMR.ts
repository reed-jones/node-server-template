import Koa from 'koa'
import koaWebpack from 'koa-webpack'
import path from 'path'

import webpackConfig from '../../../build/webpack.client.dev.config'

export default async (app: Koa<any, {}>) => {
  const koaMiddleware = await koaWebpack({ config: webpackConfig })

  const hmrMiddleware = (ctx: Koa.Context, next: () => Promise<any>) => {
    next()
    if (ctx.url === '/__webpack_hmr') {
      const filename = path.resolve(webpackConfig.output.path, 'index.html')
      ctx.response.type = 'text/event-stream'
      ctx.response.body = koaMiddleware.devMiddleware.fileSystem.createReadStream(
        filename,
      )
    }
  }

  app.use(koaMiddleware)
  app.use(hmrMiddleware)
}
