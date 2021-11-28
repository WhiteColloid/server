const db = require('../db');


module.exports =  (req, res) => {
  //Check is username is used
  const sql = 'SELECT * FRPM user WHERE username = ?';
    db(sql, req.body.username,  => {
        if(result.length >= 1){
         return res.send({
            status: 1,
            msg: 'Username already exists'
          });
        }

        const sql = 'INSERT INTO user set ?';
        const{ username, email, password } = req.body;
        db(sql, {username, email, password}, result => {
          res.send(result)
        });
  
    });
  };