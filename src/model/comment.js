const db = require("./../config/connection");
const { v4: uuidv4 } = require("uuid");

const commentByPost = (idPost) => {
  const sql = `SELECT * FROM comment WHERE id_posting="${idPost}"`;
  return db.execute(sql);
};

const addComment = (idPost, idUser, text) => {
  const id = uuidv4();
  const sql = `INSERT INTO comment (id, id_posting,id_user,text) VALUES ("${id}","${idPost}","${idUser}","${text}")`;
  return db.execute(sql);
};

const deleteComment = (idComment) => {
  const sql = `DELETE FROM comment WHERE id="${idComment}"`;
  return db.execute(sql);
};

module.exports = { commentByPost, addComment, deleteComment };
