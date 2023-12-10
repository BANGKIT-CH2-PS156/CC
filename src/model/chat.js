const db = require("./../config/connection");

const chatBox = (idSender, idReceiver) => {
  const sql = `SELECT * FROM chat WHERE (senderid='${idSender}' OR receiverid='${idSender}') AND (senderid='${idReceiver}' OR receiverid='${idReceiver}')`;
  return db.execute(sql);
};

const addChat = (idSender, idReceiver, message) => {
  const sql = `INSERT INTO chat (senderid,receiverid,message) VALUES ('${idSender}','${idReceiver}','${message}')`;
  return db.execute(sql);
};

module.exports = { chatBox, addChat };
