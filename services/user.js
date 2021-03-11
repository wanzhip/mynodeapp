const mysql = require('mysql');
const config = require('../default');
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});

class User {
  constructor() { }
  query(params) {
    const name = params.name || '';
    let sql = `SELECT s.id, s.name, s.age, s.grade, s.num, s.major, a.name as areaName FROM stumsg AS s INNER JOIN stuarea as a on s.areaId = a.id`
    if (name) {
      sql = `SELECT s.id, s.name, s.age, s.grade, s.num, s.major, a.name as areaName FROM stumsg AS s INNER JOIN stuarea as a on s.areaId = a.id where a.name like '%${name}%'`
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
      pool.query(`SELECT * from stumsg WHERE id = '${id}'`, function (error, results) {
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
      const num = params.num;
      const major = params.major;
      const grade = params.grade;
      const school = params.school;
      const age = params.age;
      const areaId = params.areaId;
      // const queryNum = `select * from stumsg where num = '${num}'`
      const queryNum = `select * from stumsg where num = ?`
      pool.query(queryNum, [num], (error, results) => {
        console.log(results, '结果');
        if (error) {
          reject(error.message + '' + __filename)
        } else {
          if (results.length == 0) {
            const sql = `INSERT INTO stumsg (name, num, major, grade, school, age, areaId) 
      VALUES ('${name}','${num}','${major}','${grade}','${school}','${age}','${areaId}')`;
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
  postAll(tableHeader, xlsxData) {
    let nums = [];
    let existNum = [];
    let tableData = [];
    xlsxData.forEach((item, index) => {
      //获取表明
      const name = item[tableHeader.A1];
      const school = item[tableHeader.B1];
      const num = item[tableHeader.C1];
      const major = item[tableHeader.D1];
      const grade = item[tableHeader.E1];
      const areaId = item[tableHeader.F1];
      const age = item[tableHeader.G1];
      tableData.push([name, school, num, major, grade, areaId, age])
      nums.push(num);//全部学号
    })
    return new Promise((resolve, reject) => {
      const queryNum = `select * from stumsg where num in (?)`
      pool.query(queryNum, [nums], (error, results) => {
        console.log(error, JSON.stringify(results), '某几个数据');
        if (results.length > 0) {
          //已存在相同学号的人
          results.map(item => {
            const num = +item.num;
            let index = nums.indexOf(num);
            existNum.push({
              row: index + 1,
              msg: `学号${item.num}已存在`
            })
          })
          reject({
            code: 400,
            data: existNum,
            msg: ''
          })
        } else {
          resolve(1);
        }
      })
    }).then(res => {
      const sql = `INSERT INTO stumsg (name,school, num, major, grade, areaId, age) VALUES ?`;
      return new Promise((resolve, reject) => {
        pool.query(sql, [tableData], function (error, results) {
          if (error) {
            reject({
              "code": 400,
              "data": null,
              "msg": error.message + '' + __filename
            })
          };
          resolve({
            "code": 0,
            "data": null,
            "msg": '导入成功'
          })
        })
      })
    }).catch(err => {
      return err
    })
  }
  put(id, params) {
    console.log(id, params);
    return new Promise((resolve, reject) => {
      const { name, num, major, grade, school, age } = params;
      const sql = `UPDATE stumsg SET name = '${name}',num = '${num}', major = '${major}', grade = '${grade}',school= '${school}',age= '${age}' WHERE id = '${id}'`;
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
      const sql = `DELETE FROM stumsg WHERE id = '${id}'`
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
      const sql = `DELETE FROM stumsg WHERE id in (${ids})`
      pool.query(sql, function (error, results) {
        if (error) {
          reject(error.message + '' + __filename)
        };
        resolve(results)
      });
    })
  }

}

module.exports = new User()

