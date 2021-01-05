const Router = require('@koa/router');
const router = new Router();

const mysql = require('../mysql/index')
router.get('/a',async (ctx, next) => {
  let data = await mysql.query()
  ctx.body = {
      "code": 0,
      "data": data,
      "msg": 'ok'
  }
  next();
});

module.exports = router.routes()