const db = require("../db");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  const userInfo = jwt.decode(req.headers.authorization.substring(7));
  const sql1 = "SELECT * FROM users WHERE id=?";

  quickSort = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].similarity > pivot.similarity) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return quickSort(left).concat([pivot], quickSort(right));
  };

  db(sql1, userInfo.id, (result1) => {
    let user = result1[0];
    if (result1.length == 1) {
      const sql2 = `SELECT u.username,u.email,u.V,u.A,u.R,u.K,c.classname 
                    FROM users u 
                    LEFT JOIN class c 
                    ON u.class = c.id
                    WHERE u.class=?`;

      db(sql2, user.class, (result2) => {
        let orUserList = JSON.parse(JSON.stringify(result2));
        if(result2.length == 0)  {
          res.send({
            status: 2,
            msg: "There are no students in the class",
          });
        }else if (result2.length >= 1 && result2.length <= 5) {
          res.send({
            status: 0,
            msg: "select success",
            data: orUserList,
          });
        } else if (result2.length > 5) {
          let userList = result2;

          let { V, A, R, K } = user;
          let similarityList = userList.map((item, index) => {
            let { V: V1, A: A1, R: R1, K: K1 } = item;

            let a = V * V1 + A * A1 + R * R1 + K * K1;
            let b = Math.sqrt(
              Math.pow(V, 2) + Math.pow(A, 2) + Math.pow(R, 2) + Math.pow(K, 2)
            );
            let c = Math.sqrt(
              Math.pow(V1, 2) +
                Math.pow(A1, 2) +
                Math.pow(R1, 2) +
                Math.pow(K1, 2)
            );

            return {
              index,
              similarity: a / (b * c),
            };
          });
          similarityList = quickSort(similarityList).slice(0, 5);
          orUserList = similarityList.map((item) => {
            return orUserList[item.index];
          });

          res.send({
            status: 0,
            msg: "select success",
            data: orUserList,
          });
        }else {
          res.send({
            status: 1,
            msg: "select failed",
          });
        }
      });
    }
  });
};
