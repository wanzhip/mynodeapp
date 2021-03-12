const mysql = require('mysql');
const config = require('../default');
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});
class Login {
  constructor() { }
  post(params) {
    return new Promise((resolve, reject) => {
      const name = params.name;
      const num = params.num;
      const queryNum = `select * from stumsg where num = ? and name = ?`
      pool.query(queryNum, [num,name], (error, results) => {
        console.log(results, '结果');
        if (error) {
          reject({
            code:400,
            msg:error.message + '' + __filename
          })
        } else {
          resolve({
            code:0,
            msg:'登录成功'
          })
        }
      })
    })
  }
}

module.exports = new Login()