const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// For pool initialization, see above
db.getConnection((err, conn) => {
  if (err) {
    console.log("Database belum tuh hidup, pak!");
  } else {
    // Jangan lupa melepaskan koneksi ketika selesai!
    console.log("Mantab pak, databasenya hidup");
    conn.release();
  }
});

module.exports = db.promise();