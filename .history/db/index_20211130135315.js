const mysql = require('mysql');

const db = mysql.createPool({
    host: 'studybuddy-db1.c4tooswi2ft4.us-east-2.rds.amazonaws.com',
    user: 'rootuser',
    password: 'rootuser',
    port: 3306
});

module.exports = (sql, arr, callback) => {
    db.query(sql, arr, function(error, result) {
        if (error) {
            return console.log(error);
        }
        callback(result);
    });
};