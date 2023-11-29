const response = require("../../response");
const db = require("./../../db/connection");
const moment = require("moment-timezone");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    //check req is not empty
    if (!email || !password || !confirmPassword) {
      response(400, "Bad request", "Please input email or password", res);
      return;
    }
    //check password input
    if (password !== confirmPassword) {
      response(400, "Bad request", "Password is not the same", res);
      return;
    }
    //check email in database is already or not
    const sql = `SELECT email FROM users WHERE email = '${email}'`;
    db.query(sql, async (err, result) => {
      if (err) {
        console.log(err);
        response(500, "Internal Server Error", null, res);
        return;
      } else if (result[0]) {
        console.log(result);
        response(400, "Bad Request", "User is already exists", res);
        return;
      }
      //Insert new data to database
      const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
      const hashed = await bcrypt.hash(password, 10);
      const sqlInsert = `INSERT INTO users (email,password,create_at,timestamp) VALUES ('${email}','${hashed}', '${currentDateTime}', '${currentDateTime}')`;
      db.query(sqlInsert, (err, result) => {
        if (err) {
          console.log(err);
          response(500, "Internal Server Error", null, res);
          return;
        }
        response(201, "Created", "Data successfully created", res);
      });
    });
  } catch (error) {
    response(500, "Internal Server Error", null, res);
    console.log(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check req is not empty
    if (!email || !password) {
      response(400, "Bad request", "Please input email or password", res);
      return;
    }
    //check email in database
    const sql = `SELECT * FROM users WHERE email = '${email}'`;
    db.query(sql, async (err, result) => {
      if (err) {
        console.log(err);
        response(500, "Internal Server Error", null, res);
        return;
      } else if (!result[0]) {
        console.log(result);
        response(403, "Forbiden", "User not Found", res);
        return;
      }
      //check password in database
      const check = await bcrypt.compare(password, result[0].password);
      if (!check) {
        response(403, "Forbiden", "Incorrect Password", res);
        return;
      }
      const token = jwt.sign(
        {
          id: result[0].id,
          email: result[0].email,
        },
        "secret",
        { expiresIn: "1h" }
      );
      console.log(token);
      response(200, "OK", token, res);
    });
  } catch (error) {
    response(500, "Internal Server Error", null, res);
    console.log(error.message);
  }
};

module.exports = { register, login };
