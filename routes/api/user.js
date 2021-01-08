const Router = require('@koa/router');
// const koaBody = require('koa-body')
const router = new Router();

const mysql = require('../../services/user')

router.get('/user', async (ctx, next) => {
  console.log(ctx.request.query);
  let data = await mysql.query(ctx.request.query)
  ctx.body = {
    "code": 0,
    "data": data,
    "msg": 'ok'
  }
  next();
});

router.get('/user/:id', async (ctx, next) => {
  const id = ctx.params.id;
  if (!id) {
    ctx.body = {
      "code": 400,
      "data": null,
      "msg": 'userid不可为空'
    }
    return
  }
  let data = await mysql.queryOne(id)
  console.log(data);
  ctx.body = {
    "code": 0,
    "data": data,
    "msg": 'ok'
  }
  next();
});
router.put('/user/:id',async (ctx, next) => {
  const id = ctx.params.id;
  const body = ctx.request.body;
  console.log(ctx.request.body,'00000');
  if (!id) {
    ctx.body = {
      "code": 400,
      "data": null,
      "msg": 'userid不可为空'
    }
    return
  }
  let data = await mysql.put(id, body)
  console.log(data);
  ctx.body = {
    "code": 0,
    "data": null,
    "msg": '修改成功'
  }
  next();
});

router.post('/user', async (ctx, next) => {
  console.log(ctx.request.body);
  const body = ctx.request.body;
  let data = await mysql.post(body)
  ctx.body = {
    "code": 0,
    "data": null,
    "msg": '添加成功'
  }
  next();
})

router.delete('/user/:id', async (ctx, next) => {
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