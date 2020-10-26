const mysql = require('mysql');
const MYSQL_CONFIG = require('../app/config/mysql_config'); // 数据库配置

// mysql
const pool = mysql.createPool(MYSQL_CONFIG);

// query sql语句入口
const query = (sql, val) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                reject(err);
            } else {
                connection.query(sql, val, (err, fields) => {
                    if(err) {
                        reject(err);
                        console.log(2222222222222222222)
                        console.log(err)
                    } else {
                        resolve(JSON.parse(JSON.stringify(fields)));
                        connection.release();
                    }
                });
            }
        });
    });
};

module.exports = {
    query
};
