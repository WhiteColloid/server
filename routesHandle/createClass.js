const db = require("../db");

module.exports = (req, res) => {
  // 1. Check if use exists
  const sql = "INSERT INTO class set ?";
  const { classname } = req.body;
  db(sql, { classname }, (result) => {
    if (result.affectedRows === 1) {
      return res.send({
        status: 0,
        msg: "create successed",
      });
    }
    res.send({
      status: 1,
      msg: "create failed",
    });
  });
};
