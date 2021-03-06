const bcrypt = require('bcryptjs');
const db = require('../db');


module.exports = (req, res) => {
    //Check if username already exists
    const sql = 'SELECT * FROM user WHERE username=?';
    db(sql, req.body.username, result => {
        if(result.length >= 1) {
            return res.send({
                status: 1,
                msg: 'Username already exsists'
            });
        }

        const sql = 'INSERT INTO user set ?';
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const { username, email, password } = req.body;
        db(sql, {username, email, password}, result => {
            if (result.affectedRows === 1) {
                return res.send({
                    status: 0,
                    msg: 'Registration successed'
                });
            }
            res.send({
                status: 1,
                msg: 'Registration failed'
            });
        });
    });
};