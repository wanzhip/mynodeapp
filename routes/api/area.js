const Router = require('@koa/router');
const fs = require('fs');
var path = require('path');
const router = new Router();
const ejs = require('ejs')

const mysql = require('../../services/area')

router.get('/area', async (ctx, next) => {
  // console.log(ctx.request.query);
  // let data = await mysql.query(ctx.request.query)
  // ctx.body = {
  //   "code": 0,
  //   "data": data,
  //   "msg": 'ok'
  // }
  console.log(ctx, '此时的ctx');
  let filePath = path.join(__dirname, 'tem.ejs')
  let data1 = fs.readFileSync(filePath, "utf-8")
  console.log(data1);
  ctx.response.header['Content-Type'] = 'text/html'
  var title = "hello world";
  var userInfo = {
    name: "devil13th",
    age: 5,
    school: "THD",
    message: "<div style='border:1px solid red;'>i'm message</div>"
  };
  var html = ejs.render(data1, { title: title, userInfo: userInfo });
  console.log(html);
  // res.end(html);
  ctx.type = "html";
  ctx.body = html
  // ctx.body = {
  //   "code": 0,
  //   "data": html,
  //   "msg": 'ok'
  // }
  next();
  // function (err, data) {
  //   console.log(data);
  //   ctx.response.header['Content-Type'] = 'text/html'
  //   // res.writeHead(200, { 'Content-Type': 'text/html' });
  //   var title = "hello world";
  //   var userInfo = {
  //     name: "devil13th",
  //     age: 5,
  //     school: "THD",
  //     message: "<div style='border:1px solid red;'>i'm message</div>"
  //   };
  //   var html = ejs.render(data, { title: title, userInfo: userInfo });
  //   console.log(html);
  //   // res.end(html);
  //   ctx.body = {
  //     "code": 0,
  //     "data": html,
  //     "msg": 'ok'
  //   }
  //   next();
  // })

});

router.get('/area/:id', async (ctx, next) => {
  const id = ctx.params.id;
  if (!id) {
    ctx.body = {
      "code": 400,
      "data": null,
      "msg": 'areaid不可为空'
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
router.put('/area/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const body = ctx.request.body;
  console.log(ctx.request.body, '00000');
  if (!id) {
    ctx.body = {
      "code": 400,
      "data": null,
      "msg": 'areaid不可为空'
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

router.post('/area', async (ctx, next) => {
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

router.delete('/area/:id', async (ctx, next) => {
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

router.delete('/area', async (ctx, next) => {
  console.log(ctx.request.body);
  const body = JSON.parse(ctx.request.body.ids);
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

router.post('area/upload', async (ctx, next) => {
  const file = ctx.request.body.file.file;
  const reader = fs.createReadStream(file.path);
  const ext = file.name.split('.').pop();
  console.log(`upload/${Math.random().toString()}.${ext}`);
  const upStream = fs.createWriteStream(`upload/${Math.random().toString()}.${ext}`)
  reader.pipe(upStream);
})

module.exports = router.routes()