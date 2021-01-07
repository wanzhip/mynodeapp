
const config = require('../default')
const Koa = require('koa');
const cors = require('koa2-cors');
const app =  new Koa();

app.use(cors());
app.use(require("./api/user"));
app.use(async (ctx,next)=>{
  try {
      await next();
  } catch (error) {
      ctx.app.emit('err',error,ctx)
  }
})
app.on('err',(err,ctx)=>{
  console.log(err,'捕捉到了错误');
})

app.listen(config.port)
console.log(`listening on port ${config.port}`)