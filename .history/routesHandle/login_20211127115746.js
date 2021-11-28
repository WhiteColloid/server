const db = require('../db');
const bcrypt = require('bcryptjs');

module.exports = (req, res) => {
    //Check if use exists
    const sql = 'SELECT * FROM user WHERE username=?';
    db(sql, req.body.username, result => {
        if (result.length !== 1){
            res.send({
                status: 1,
                msg: 'User dont exist'
            });
        }

    });
    //If yes, compare password
    const psRes = bcrypt.compareSync(req.body.password, result[0].password);
    if (!psRes) {
        return res.send({
            status: 1,
            msg: 'Wrong password'
        });
    }
    res.send({
        status: 0,
        msg: 'Login success!'
    });
};