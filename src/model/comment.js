const db = require("./../config/connection");
const { v4: uuidv4 } = require("uuid");

const commentByPost = (idPost) => {
  // const sql = `SELECT * FROM comment WHERE id_posting=?`;
  const sql = `SELECT comment.id as id_comment, comment.id_posting, comment.id_user, users.name, comment.text, comment.timestamp
               FROM comment 
               INNER JOIN users ON comment.id_user = users.id
               WHERE comment.id_posting=?`
  return db.execute(sql, [idPost]);
};

const addComment = (idPost, idUser, text) => {
  const id = uuidv4();
  const sql = `INSERT INTO comment (id, id_posting,id_user,text) VALUES (?,?,?,?)`;
  return db.execute(sql, [id, idPost, idUser, text]);
};

const deleteComment = (idComment) => {
  const sql = `DELETE FROM comment WHERE id=?`;
  return db.execute(sql, [idComment]);
};

module.exports = { commentByPost, addComment, deleteComment };
