const mysql = require('muysql');

const db = mysql.creatPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'login'
});