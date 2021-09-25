const express = require("express");

const Router = express.Router();

const bookingController = require("./bookingController");

Router.get("/booking-id/:id", bookingController.getBookingByIdBooking);
// Router.get("/user-id/:id", bookingController.getBookingByIdUser);
Router.get("/seatBooking", bookingController.getSeatBooking);
Router.post("/", bookingController.postBooking);

module.exports = Router;
