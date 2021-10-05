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

// let connectDb;
// function handleDisconnect() {
//   connectDb = mysql.createConnection(connection);

//   connectDb.connect((error) => {
//     if (error) {
//       console.log("error when connecting to db:", error);
//       setTimeout(handleDisconnect, 2000);
//     }
//     // eslint-disable-next-line no-console
//     console.log("you are now connected db mysql...");
//   });

//   connection.on("error", (error) => {
//     console.log("db error", error);
//     if (error.code === "PROTOCOL_CONNECTION_LOST") {
//       handleDisconnect();
//     } else {
//       throw error;
//     }
//   });
// }
// handleDisconnect();

module.exports = connection;
