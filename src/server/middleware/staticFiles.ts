import send from 'koa-send'
import Koa from 'koa'

import { staticFileOptions } from '@server/middleware/staticFiles.d'

export default (opts: staticFileOptions = {}) => async (ctx: Koa.Context, next: () => Promise<any>) => {
  opts = {
    index: 'index.html',
    root: 'dist/public',
    debug: false,
    ...opts,
  }

  await next()

  if ((ctx.method != 'GET' && ctx.method != 'HEAD') || ctx.body != null || ctx.status != 404) {
    if (opts.debug) {
      console.log(`Serving API Request ${ctx.method}: ${ctx.url}`)
    }
    return
  }

  if (opts.debug) {
    let url = ctx.url === '/' ? `/${opts.index}` : ctx.url

    console.log(`Serving File Request: ${url}`)
  }

  await send(ctx, ctx.path, { index: opts.index, root: opts.root })
}
