import Router from 'koa-router'

const router = new Router()

router.get('/hello', async (ctx, next) => {
  ctx.body = 'Hello'
})

export default router
