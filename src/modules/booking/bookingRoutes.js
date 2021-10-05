const express = require("express");

const Router = express.Router();

const bookingController = require("./bookingController");
const middlewareAuth = require("../../middleware/auth");

Router.get(
  "/booking-id/:id",
  middlewareAuth.authentication,
  bookingController.getBookingByIdBooking
);
Router.get(
  "/user-id/:id",
  middlewareAuth.authentication,
  bookingController.getBookingByIdUser
);
Router.get(
  "/seatBooking",
  middlewareAuth.authentication,
  bookingController.getSeatBooking
);
Router.post("/", middlewareAuth.authentication, bookingController.postBooking);
Router.patch(
  "/use-ticket/:id",
  middlewareAuth.authentication,
  bookingController.updateTicketStatus
);
Router.get(
  "/dashboard",
  middlewareAuth.authentication,
  middlewareAuth.authorization,
  bookingController.dashboard
);

module.exports = Router;
