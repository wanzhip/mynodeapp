const mysql = require('mysql');
const config = require('../default');
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});


class Area {
  constructor() { }
  query(params) {
    const name = params.name || '';
    let sql = `SELECT * from stuarea`
    if (name) {
      sql = `SELECT * from stuarea where name like '%${name}%'`
    }
    return new Promise((resolve, reject) => {
      pool.query(sql, function (error, results) {
        console.log(error, results);
        if (error) {
          reject(error.message + '' + __filename)
        };
        resolve(results)
      });
    })
  }
  queryOne(id) {
    console.log(id);
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * from stuarea WHERE id = '${id}'`, function (error, results) {
        if (error) {
          reject(error.message + '' + __filename)
        };
        resolve(results)
      });
    })
  }
  post(params) {
    return new Promise((resolve, reject) => {
      const name = params.name;
      const queryNum = `select * from stuarea where name = '${name}'`
      pool.query(queryNum, (error, results) => {
        console.log(results, '结果');
        if (error) {
          reject(error.message + '' + __filename)
        } else {
          if (results.length == 0) {
            const sql = `INSERT INTO stuarea (name) 
      VALUES ('${name}')`;
            pool.query(sql, function (error, results) {
              if (error) {
                reject(error.message + '' + __filename)
              };
              resolve(results)
            })
          } else {
            resolve('学号已存在')
          }
        }
      })
    })
  }
  put(id, params) {
    console.log(id, params);
    return new Promise((resolve, reject) => {
      const { name } = params;
      const sql = `UPDATE stuarea SET name = '${name}' WHERE id = '${id}'`;
      pool.query(sql, function (error, results) {
        if (error) {
          reject(error.message + '' + __filename)
        };
        resolve(results)
      })
    })
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM stuarea WHERE id = '${id}'`
      pool.query(sql, function (error, results) {
        if (error) {
          reject(error.message + '' + __filename)
        };
        resolve(results)
      });
    })
  }
  
  deletePart(body) {
    const ids = body;
    console.log(ids);
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM stuarea WHERE id in (${ids})`
      pool.query(sql, function (error, results) {
        if (error) {
          reject(error.message + '' + __filename)
        };
        resolve(results)
      });
    })
  }

}

module.exports = new Area()

