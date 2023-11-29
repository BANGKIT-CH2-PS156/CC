const response = require("./../../response");
const db = require("./../../db/connection");

const allUsers = async (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      response(400, "Fail", null, res);
    } else {
    //   console.log(result);
      response(200, "Response Success", result, res);
    }
  });
};

module.exports = { allUsers };
