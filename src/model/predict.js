const db = require("../config/connection");

const allPredict = (idUser) => {
  const sql = `SELECT * FROM predict WHERE id_user='${idUser}'`;
  return db.execute(sql);
};

const addPredict = (idUser, img, info) => {
  const sql = `INSERT INTO predict (id_user,img,info) VALUES ('${idUser}','${img}','${info}')`;
  return db.execute(sql);
};

module.exports = { allPredict, addPredict };
