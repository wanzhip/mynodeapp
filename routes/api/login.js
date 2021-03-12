const Router = require('@koa/router');
const router = new Router();

const mysql = require('../../services/login')

router.post('/login', async (ctx, next) => {
  console.log(ctx.request.body);
  const body = ctx.request.body;
  let data = await mysql.post(body)
  ctx.body = data;
  next();
})

module.exports = router.routes()