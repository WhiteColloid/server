const db = require('../db');

module.exports = (req, res) => {
    //Check if use exists
    const sql = 'SELECT * FROM user WHERE username=? ';
    db(sql, req.body.username, result => {
        if (result.length !== 1){
            res.send({
                status: 1,
                msg: 'User doesnt exist'
            });
        }

    });
    //If yes, compare password
    res.send({
        status: 0,
        msg: 'Login success!'
    });
};