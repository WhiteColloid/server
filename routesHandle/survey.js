const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const config = require("../config");

module.exports = (req, res) => {
  // 1. Check if use exists
  const userInfo = jwt.decode(req.headers.authorization.substring(7));
  const sql = "UPDATE users SET V=?,A=?,R=?,K=?,class=? WHERE id=?";
  req.body.push(userInfo.id);
  db(sql, req.body, (result) => {
    if (result.affectedRows === 1) {
      return res.send({
        status: 0,
        msg: "submit successed",
      });
    }
    res.send({
      status: 1,
      msg: "submit failed",
    });
  });
};
