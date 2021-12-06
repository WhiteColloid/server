const db = require("../db");

module.exports = (req, res) => {
  // 1. Check if use exists
  const sql = "SELECT * from class order by id asc";
  db(sql, [], (result) => {
    res.send({
      status: 0,
      msg: "select success",
      data: result,
    });
    
  });
};
