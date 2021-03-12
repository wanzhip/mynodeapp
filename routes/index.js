
const config = require('../default')
const Koa = require('koa');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const app = new Koa();
app.use(koaBody({
  multipart: true,  // 支持表单上传
  formidable: {
    maxFileSize: 10 * 1024 * 1024, // 修改文件大小限制，默认位10M
  }
}))
app.use(cors());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log('1111111111');
    ctx.response.status = err.statusCode || err.status || 200;
    ctx.body = {
      code: '400',
      data: null,
      msg: err
    };
    ctx.app.emit('err', err, ctx)
  }
})
app.use(require("./api/user"));
app.use(require("./api/area"));
app.use(require("./api/login"));


app.on('err', (err, ctx) => {
  console.log(err, '捕捉到了错误');
})
app.listen(config.port)
console.log(`listening on port ${config.port}`)