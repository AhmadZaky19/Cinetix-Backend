const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log("you are now connected db mysql...");
});

module.exports = connection;
