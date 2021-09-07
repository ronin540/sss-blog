
const mysql = require("mysql2/promise");

async function fetch(query, attributes) {

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
  });
  const [rows, fields] = await conn.query(query, attributes);
  await conn.end();
  return rows;

}


module.exports = fetch;
