const db = require("../config/connection");

const allPredict = (idUser) => {
  const sql = `SELECT * FROM predict WHERE id_user=?`;
  return db.execute(sql, [idUser]);
};

const addPredict = (idUser, img, info) => {
  const sql = `INSERT INTO predict (id_user,img,info) VALUES (?,?,?)`;
  return db.execute(sql, [idUser, img, info]);
};

module.exports = { allPredict, addPredict };
