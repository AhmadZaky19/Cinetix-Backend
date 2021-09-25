const express = require("express");

const Router = express.Router();

const bookingController = require("./bookingController");

// Router.get("/:idBooking", bookingController.getBookingByIdBooking);
// Router.get("/:idUser", bookingController.getBookingByIdUser);
Router.get("/seatBooking", bookingController.getSeatBooking);
Router.post("/", bookingController.postBooking);

module.exports = Router;
