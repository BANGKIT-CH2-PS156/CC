const db = require("./../config/connection");
const { v4: uuidv4 } = require("uuid");

const allPosting = () => {
  const sql = `SELECT posting.id as id_posting, posting.id_user, users.name, posting.caption, posting.img, posting.create_at, posting.timestamp
               FROM posting INNER JOIN users ON posting.id_user = users.id ORDER BY posting.create_at DESC`;
  return db.execute(sql);
};

const allPostingByUser = (idUser) => {
  const sql = `SELECT posting.id as id_posting, posting.id_user, users.name, posting.caption, posting.img, posting.create_at, posting.timestamp
               FROM posting INNER JOIN users ON posting.id_user = users.id
               WHERE posting.id_user=? ORDER BY posting.create_at DESC`;
  return db.execute(sql, [idUser]);
};

const onePosting = (idPosting) => {
  const sql = `SELECT posting.id as id_posting, posting.id_user, users.name, posting.caption, posting.img, posting.create_at, posting.timestamp
               FROM posting INNER JOIN users ON posting.id_user = users.id
               WHERE posting.id=?`;
  return db.execute(sql, [idPosting]);
};

const addPosting = (idUser, caption, img) => {
  const id = uuidv4();
  const sql = `INSERT INTO posting (id, id_user, caption, img) VALUES (?,?,?,?)`;
  return db.execute(sql,[id, idUser, caption, img]);
};

const updatePosting = (id, caption, img) => {
  const sql = `UPDATE posting SET caption=?,img=? WHERE id=?`;
  return db.execute(sql, [caption, img, id]);
};

const deletePosting = (id) => {
  const sql = `DELETE FROM posting WHERE id=?`;
  return db.execute(sql, [id]);
};

module.exports = {
  allPosting,
  allPostingByUser,
  onePosting,
  addPosting,
  updatePosting,
  deletePosting,
};
