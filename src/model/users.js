const db = require("./../config/connection");

const allUsers = () => {
  const sql = "SELECT * FROM users";
  return db.execute(sql);
};

const oneUser = (email) => {
  const sql = `SELECT * FROM users WHERE email='${email}'`;
  return db.execute(sql);
};

const addUser = (email, password) => {
  const sql = `INSERT INTO users (email,password) VALUES ('${email}','${password}')`;
  return db.execute(sql);
};

module.exports = { allUsers, oneUser, addUser };
