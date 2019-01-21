import Koa from 'koa'
import send from 'koa-send'

import { IStaticFileOptions } from '@server/middleware/staticFiles.d'

export default (opts: IStaticFileOptions = {}) => async (ctx: Koa.Context, next: () => Promise<any>) => {
  opts = {
    debug: false,
    index: 'index.html',
    root: 'dist/public',
    ...opts,
  }

  await next()

  if (ctx.method !== 'GET' && ctx.method !== 'HEAD') {
    if (opts.debug) {
      // tslint:disable-next-line:no-console
      console.log(`Serving API Request ${ctx.method}: ${ctx.url}`)
    }
    return
  }

  if (ctx.body !== null || ctx.status !== 404) {
    if (opts.debug) {
      // tslint:disable-next-line:no-console
      console.log(`Serving API Request ${ctx.method}: ${ctx.url}`)
    }
    return
  }

  if (opts.debug) {
    const url = ctx.url === '/' ? `/${opts.index}` : ctx.url
    // tslint:disable-next-line:no-console
    console.log(`Serving File Request: ${url}`)
  }

  await send(ctx, ctx.path, { index: opts.index, root: opts.root })
}
