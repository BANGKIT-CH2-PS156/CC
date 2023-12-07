const db = require("./../config/connection");

const allHistory = (idUser) => {
  const sql = `SELECT * FROM history_checker WHERE id_user='${idUser}'`;
  return db.execute(sql);
};

const addHistory = (idUser, img, info) => {
  const sql = `INSERT INTO history_checker (id_user,img,info) VALUES ('${idUser}','${img}','${info}')`;
  return db.execute(sql);
};

module.exports = { allHistory, addHistory };
