const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
});

db.connect();

db.on('error',(error)=>{
  console.log('Databasenya belom hidup tuh pak')
})

module.exports = db.promise();