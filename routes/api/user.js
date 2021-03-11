const Router = require('@koa/router');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
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

router.post('/upload', async (ctx) => {
  console.log('11111111111');

  const file = ctx.request.files.file;   // 获取上传文件
  // const reader = fs.createReadStream(file.path);  // 创建可读流
  // const ext = file.name.split('.').pop();
  // let fileName = `public/upload/${file.name.split('.').shift()}.${ext}`
  // const upStream = fs.createWriteStream(fileName);    // 创建可写流
  // reader.pipe(upStream);  // 可读流通过管道写入可写流
  // upStream.on('finish',  async function () {
    // console.error('写入已完成');
    // const path2 = path.join(__dirname, '../../public/upload/user.xlsx')
    let workbook = xlsx.readFile(file.path); //workbook就是xls文档对象
    let sheetNames = workbook.SheetNames; //获取表名
    let sheet = workbook.Sheets[sheetNames[0]]; //通过表明得到表对象
    console.log(sheet);
    console.log(sheet['!ref']);
    console.log(sheet['A1'], '111');
    console.log(sheet['A1'].v, '222');
    let A1 = sheet['A1'].v;
    let B1 = sheet['B1'].v;
    let C1 = sheet['C1'].v;
    let D1 = sheet['D1'].v;
    let E1 = sheet['E1'].v;
    let F1 = sheet['F1'].v;
    let G1 = sheet['G1'].v;
    let tableHeader = {//列名
      A1, B1, C1, D1, E1, F1, G1
    }
    console.log(tableHeader);
    let xlsxData = xlsx.utils.sheet_to_json(sheet); //通过工具将表对象的数据读出来并转成json
    console.log(xlsxData);
    let data =  await mysql.postAll(tableHeader, xlsxData)
    console.log(data, '数据库返回数据');
    ctx.body = data;
    console.log('执行结束');
  // });
  // console.log('33333333333333');
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


module.exports = router.routes()