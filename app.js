const Koa = require('koa');
const cors = require('koa2-cors');
const config = require('./default')
const app =  new Koa();
app.use(cors());
app.use(require("./router/index"));

 
app.listen(config.port) 
console.log(`listening on port ${config.port}`)