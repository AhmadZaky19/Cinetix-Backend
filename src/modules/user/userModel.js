const connection = require("../../config/mysql");

module.exports = {
  getUserById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE id = ?",
        id,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL: ${error.sqlMassage}`));
          }
        }
      );
    }),
  updateUser: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query("UPDATE user SET ?", [data, id], (error) => {
        if (!error) {
          const newResult = {
            id,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
};
