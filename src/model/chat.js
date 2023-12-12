const db = require("./../config/connection");

const chatBox = (idSender, idReceiver) => {
  const sql = `SELECT chat.id, chat.senderid, sender.name AS sender, chat.receiverid, receiver.name AS receiver, chat.message, chat.timestamp 
               FROM chat 
               INNER JOIN users AS sender ON chat.senderid = sender.id 
               INNER JOIN users AS receiver ON chat.receiverid = receiver.id
               WHERE (chat.senderid = ? OR chat.receiverid = ?)
               AND (chat.senderid = ? OR chat.receiverid = ?)`;
  return db.execute(sql, [idSender, idSender, idReceiver, idReceiver]);
};

const addChat = (idSender, idReceiver, message) => {
  const sql = `INSERT INTO chat (senderid,receiverid,message) VALUES (?,?,?)`; //how to prevent sql injection attacks
  return db.execute(sql, [idSender, idReceiver, message]);
};

module.exports = { chatBox, addChat };
