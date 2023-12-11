const db = require("./../config/connection");
const { v4: uuidv4 } = require("uuid");

const allPosting = () => {
  const sql = "SELECT * FROM posting ORDER BY create_at DESC";
  return db.execute(sql);
};

const allPostingByUser = (idUser) => {
  const sql = `SELECT * FROM posting WHERE id_user=? ORDER BY create_at DESC`;
  return db.execute(sql, [idUser]);
};

const onePosting = (idPosting) => {
  const sql = `SELECT * FROM posting WHERE id=${idPosting}`;
  return db.execute(sql);
};

const addPosting = (idUser, caption, img) => {
  const id = uuidv4();
  const sql = `INSERT INTO posting (id, id_user, caption, img) VALUES ('${id}','${idUser}','${caption}','${img}')`;
  return db.execute(sql);
};

const updatePosting = (id, caption, img) => {
  const sql = `UPDATE posting SET caption='${caption}',img='${img}' WHERE id='${id}'`;
  return db.execute(sql);
};

const deletePosting = (id) => {
  const sql = `DELETE FROM posting WHERE id='${id}'`;
  return db.execute(sql);
};

module.exports = {
  allPosting,
  allPostingByUser,
  onePosting,
  addPosting,
  updatePosting,
  deletePosting,
};
