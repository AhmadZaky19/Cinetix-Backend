const connection = require("../../config/mysql");

module.exports = {
  getBookingByIdBooking: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT b.id, b.userId, b.dateBooking, b.timeBooking, b.movieId, b.scheduleId, b.totalTicket, b.totalPayment, b.paymentMethod, b.statusPayment, b.statusUsed, sb.seat FROM booking AS b JOIN seatbooking AS sb ON b.id = sb.bookingId WHERE b.Id = ?",
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
  getBookingByIdUser: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT b.id, b.userId, b.dateBooking, b.timeBooking, b.movieId, b.scheduleId, b.totalTicket, b.totalPayment, b.paymentMethod, b.statusPayment, b.statusUsed, sb.seat FROM booking AS b JOIN seatbooking AS sb ON b.id = sb.bookingId WHERE b.userId = ?",
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
  getSeatBooking: (schedule, movie, date, time) =>
    new Promise((resolve, reject) => {
      connection.query(
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
    }),
  detailBookingById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM booking WHERE id = ?",
        id,
        (error, results) => {
          if (!error) {
            resolve(results);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  postBooking: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO booking SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  postSeatBooking: (data) =>
    new Promise((resolve, reject) => {
      connection.query(
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
    }),
  updateTicketStatus: (ticketStatus, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE booking SET ? WHERE id = ?",
        [ticketStatus, id],
        (error) => {
          if (!error) {
            const parseData = { ...ticketStatus };
            const { statusUsed } = parseData;
            const newResult = {
              id,
              statusUsed,
              updatedAt: parseData.updatedAt,
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
