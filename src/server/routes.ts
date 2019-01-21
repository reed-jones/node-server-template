import Router from 'koa-router'

const router = new Router()

router.get(`/api/hello`, async (ctx, next) => {
  ctx.body = `Hello`
})

export default router
