const mysql = require('muysql');

const db = mysql.creatPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'login'
});


module.exports = (sql, arr, callback) => {
    db.query(sql, arr, function(error, result){
        if(error){
            return console.log(error);
        }
    });
};