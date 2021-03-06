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
        "SELECT b.id, b.userId, b.dateBooking, b.timeBooking, b.movieId, b.scheduleId, b.totalTicket, b.totalPayment, b.paymentMethod, b.statusPayment, b.statusUsed, m.name, s.premiere FROM booking AS b JOIN movie as m on b.movieId = m.id JOIN schedule as s on b.scheduleId = s.id WHERE b.userId = ?",
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
  getSeatBookingDetail: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT seat FROM seatbooking WHERE bookingId = ? ",
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
        `SELECT MONTHNAME(b.createdAt) AS month, SUM(b.totalPayment) AS total FROM booking AS b JOIN schedule AS s ON b.movieId = s.movieId WHERE YEAR(b.createdAt) = YEAR(NOW()) AND b.movieId LIKE '%${movieId}%' AND s.premiere LIKE '%${premiere}%' AND s.location LIKE '%${location}%' GROUP BY MONTHNAME(b.createdAt)`,
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
