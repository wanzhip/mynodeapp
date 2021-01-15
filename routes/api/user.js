const Router = require('@koa/router');
const fs = require('fs');
const static = require('koa-static');
const send = require('koa-send');
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

router.get('/templates/:name', async (ctx, next) => {
  const name = ctx.params.name;
  const path = `public/templates/${name}`;
  ctx.attachment(path);
  await send(ctx, path);
});

router.post('/upload', async (ctx)=>{
  const file = ctx.request.files.file;   // 获取上传文件
  console.log(file,'文件');
  const reader = fs.createReadStream(file.path);  // 创建可读流
  const ext = file.name.split('.').pop();     // 获取上传文件扩展名
  const upStream = fs.createWriteStream(`public/upload/${Math.random().toString()}.${ext}`);     // 创建可写流
  reader.pipe(upStream);  // 可读流通过管道写入可写流
  return ctx.body = {
    "code": 0,
    "data": null,
    "msg": '上传成功'
  };
})

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
router.put('/user/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const body = ctx.request.body;
  console.log(ctx.request.body, '00000');
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
  if (typeof data == 'object') {
    ctx.body = {
      "code": 0,
      "data": null,
      "msg": '添加成功'
    }
  } else {
    ctx.body = {
      "code": 400,
      "data": null,
      "msg": data
    }
  }
  next();
})

router.delete('/user/:id', async (ctx, next) => {
  // console.log(ctx.request.body);
  // console.log(ctx.params);
  const id = ctx.params.id;
  let data = await mysql.delete(id)
  ctx.body = {
    "code": 0,
    "data": data,
    "msg": 'ok'
  }
  next();
})

router.delete('/user', async (ctx, next) => {
  console.log(ctx.request.body);
  const body = JSON.parse( ctx.request.body.ids );
  if (body.length == 0) {
    ctx.body = {
      "code": 400,
      "data": null,
      "msg": '参数不可为空'
    }
    next();
  } else {
    let data = await mysql.deletePart(body)
    ctx.body = {
      "code": 0,
      "data": data,
      "msg": 'ok'
    }
    next();
  }
})

router.post('user/upload', async(ctx, next) =>{
  const file = ctx.request.body.file.file;
  const reader = fs.createReadStream(file.path);
  const ext = file.name.split('.').pop();
  console.log(`upload/${Math.random().toString()}.${ext}`);
  const upStream = fs.createWriteStream(`upload/${Math.random().toString()}.${ext}`)
  reader.pipe(upStream); 
})

module.exports = router.routes()