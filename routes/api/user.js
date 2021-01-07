const Router = require('@koa/router');
const koaBody = require('koa-body')
const router = new Router();

const mysql = require('../../services/user')
router.get('/user',async (ctx, next) => {
  let data = await mysql.query()
  ctx.body = {
      "code": 0,
      "data": data,
      "msg": 'ok'
  }
  next();
});

router.post('/user', koaBody(), async (ctx, next)=>{
  console.log(ctx.request.body);
  const body = ctx.request.body;
  let data = await mysql.post(body)
  ctx.body = {
      "code": 0,
      "data": data,
      "msg": 'ok'
  }
  next();
})

router.delete('/user/:id', koaBody(), async (ctx, next)=>{
  console.log(ctx.request.body);
  console.log(ctx.params);
  const id = ctx.params.id;
  let data = await mysql.delete(id)
  ctx.body = {
      "code": 0,
      "data": data,
      "msg": 'ok'
  }
  next();
})

module.exports = router.routes()