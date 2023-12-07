const db = require("./../config/connection");

const allPosting = () => {
  const sql = "SELECT * FROM posting ORDER BY create_at DESC";
  return db.execute(sql);
};

const allPostingByUser = (idUser) => {
  const sql = `SELECT * FROM posting WHERE id_user=${idUser} ORDER BY create_at DESC`;
  return db.execute(sql);
};

const addPosting = (idUser, caption, img) => {
  const sql = `INSERT INTO posting (id_user, caption, img) VALUES ('${idUser}','${caption}','${img}')`;
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
  addPosting,
  updatePosting,
  deletePosting,
};
