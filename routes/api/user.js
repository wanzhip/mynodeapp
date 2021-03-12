const Router = require('@koa/router');
const xlsx = require('xlsx');
const send = require('koa-send');
const router = new Router();

const mysql = require('../../services/user')

router.get('/user', async (ctx, next) => {
  console.log(ctx.request.query);
  let data = await mysql.query(ctx.request.query)
  console.log('拿到的数据',data,'拿到的数据');
  ctx.body = {
    "code": 0,
    "count":data.res[0].total,
    "data": data.results,
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
function createWs(data, fields, titles) {
  const ws = xlsx.utils.json_to_sheet(
    data,
    {
      header: fields
    }
  )
  const range = xlsx.utils.decode_range(ws['!ref'])
  for (let c = range.s.c; c <= range.e.c; c++) {
    const header = xlsx.utils.encode_col(c) + '1'
    ws[header].v = titles[ws[header].v]
  }
  return ws
}
router.get('/exportUser', async (ctx, next) => {
  let data = await mysql.queryExcel(ctx.request.query)
  console.log(data, '要导出的数据');
  const files = ['name', 'school', 'num','major', 'grade', 'areaId', 'age'];
  const titles = {
    name: '姓名',
    school: '学校',
    num: '学号',
    major: '专业',
    grade: '年级',
    areaId: '地区',
    age: '年龄',
  }
  let sheet = createWs(data, files, titles)
  let workbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet1')//最后那个是工作薄表的命名
  let buf = xlsx.write(workbook, {
    type: 'buffer',
    bookType: 'xlsx'
  })
  let filename = 'users.xlsx'
  ctx.set('Content-disposition', 'attachment; filename=' + filename);
  ctx.type = "xlsx"
  ctx.body = buf
  return buf
});
router.post('/upload', async (ctx) => {
  const file = ctx.request.files.file;   // 获取上传文件
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
  let data = await mysql.postAll(tableHeader, xlsxData)
  console.log(data, '数据库返回数据');
  ctx.body = data;
  console.log('执行结束');
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