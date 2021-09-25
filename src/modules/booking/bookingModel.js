const connection = require("../../config/mysql");

module.exports = {
  getBookingByIdBooking: (idBooking) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT b.id, b.userId, b.dateBooking, b.timeBooking, b.movieId, b.scheduleId, b.totalTicket, b.totalPayment, b.paymentMethod, b.statusPayment, sb.seat FROM booking AS b JOIN seatbooking AS sb ON b.id = sb.bookingId WHERE b.Id ?",
        idBooking,
        (error, result) => {
          if (!error) {
            if (result.length < 1) {
              reject(new Error("Data not found"));
            } else {
              resolve(result);
            }
          } else {
            reject(new Error(`SQL: ${error.sqlMassage}`));
          }
        }
      );
    }),
  getBookingByIdUser: (id) =>
    new Promise((resolve, reject) => {
      connection.query("", id, (error, result) => {
        if (!error) {
          if (result.length < 1) {
            reject(new Error("Data not found"));
          } else {
            resolve(result);
          }
        } else {
          reject(new Error(`SQL: ${error.sqlMassage}`));
        }
      });
    }),
  getSeatBooking: (schedule, movie, date, time) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "SELECT id, seat FROM seatbooking WHERE scheduleId = ? AND movieId = ? AND dateBooking = ? AND timeBooking = ?",
        [schedule, movie, date, time],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL: ${error.sqlMassage}`));
          }
        }
      );
      console.log(query.sql);
    }),
  postBooking: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO booking SET ?",
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
      // eslint-disable-next-line no-console
      console.log(query.sql);
    }),
  postSeatBooking: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO seatBooking SET ?",
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
      // eslint-disable-next-line no-console
      console.log(query.sql);
    }),
};
