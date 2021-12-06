const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const config = require("../config");

module.exports = (req, res) => {
  // 1. Check if use exists
  const sql = "SELECT * from users WHERE username=?";
  db(sql, req.body.username, (result) => {
    if (result.length !== 1) {
      return res.send({
        status: 1,
        msg: "User doest exist",
      });
    }
    // 2. If yes, compare the password
    const psRes = bcrypt.compareSync(req.body.password, result[0].password);
    if (!psRes) {
      return res.send({
        status: 1,
        msg: "Wrong password",
      });
    }
    // 3. Generate token based on user info
    let { username, email, isProfessor,id } = result[0];
    const token = jwt.sign({ username, email, isProfessor,id }, config.jwtKey, {
      expiresIn: "1h",
    });

    res.send({
      status: 0,
      msg: "Logged in",
      token,
    });
  });
};
