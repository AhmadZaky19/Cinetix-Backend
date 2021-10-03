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
      connection.query(
        "UPDATE user SET ? WHERE id = ?",
        [data, id],
        (error) => {
          if (!error) {
            const newResult = {
              id,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  updatePassword: (newPassword, confirmPassword, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET ? WHERE id = ?",
        [newPassword, confirmPassword, id],
        (error) => {
          if (!error) {
            const newResult = {
              id,
              password: newPassword,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  updateImage: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET ? WHERE id = ?",
        [data, id],
        (error) => {
          if (!error) {
            const newResult = {
              id,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  dashboard: (movieId, location, premiere) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT MONTH(b.createdAt) AS month, SUM(b.totalPayment) AS total FROM booking AS b JOIN schedule ON b.scheduleId=schedule.id WHERE b.movieId = ? AND schedule.location LIKE ? AND schedule.premiere LIKE ? AND YEAR(b.createdAt) = YEAR(NOW()) GROUP BY MONTH (b.createdAt)",
        [movieId, `%${location}%`, `%${premiere}%`],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
};
