const db = require("./../config/connection");
//get all user
const allUsers = () => {
  const sql = "SELECT * FROM users";
  return db.execute(sql);
};
//get one user by email
const oneUser = (email) => {
  const sql = `SELECT * FROM users WHERE email='${email}'`;
  return db.execute(sql);
};
//add user register
const addUser = (email, password) => {
  // take the word before @
  const parts = email.split("@");
  const name = parts[0];
  //inset to database
  const sql = `INSERT INTO users (email,password,name) VALUES ('${email}','${password}','${name}')`;
  return db.execute(sql);
};
//add user via google account
const addUserGoogle = (email, name, img) => {
  //inset to database
  const defaultPw = "user-login-by-google-account";
  const sql = `INSERT INTO users (email,password,name,img,verify) 
              VALUES ('${email}','${defaultPw}','${name}','${img}',1)`;
  return db.execute(sql);
};
//verify email
const verifyEmail = (email) => {
  const sql = `UPDATE users SET verify=1 WHERE email='${email}'`;
  return db.execute(sql);
};

const updateUser = (email, name, job, address, phone) => {
  const sql = `UPDATE users SET name='${name}',job='${job}',address='${address}',phone='${phone}' WHERE email='${email}',`;
  return db.execute(sql);
};

module.exports = { allUsers, oneUser, addUser, addUserGoogle, verifyEmail, updateUser };
