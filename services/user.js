const mysql = require('mysql');
const config = require('../default');


var pool  = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE
});

class User {
  constructor () {}
  query () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * from stumsg where grade = 1', function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }
  post(params){
    return new Promise((resolve,reject)=>{

      const name = params.name ;
      const num = params.num ;
      const major = params.major ;
      const grade = params.grade ;
      const school = params.school ;
      const age = params.age ;

      const sql = `INSERT INTO stumsg (name, num, major, grade, school, age) 
      VALUES ('${name}','${num}','${major}','${grade}','${school}','${age}')`;
      pool.query(sql,function(error, results){
        if(error){
          throw error
        };
        resolve(results)
      })
    })
  }
  delete (id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM stumsg WHERE id = '${id}'`
      pool.query(sql, function (error, results, fields) {
          if (error) {
              throw error
          };
          resolve(results)
      });
    })
  }

}

module.exports = new User()

