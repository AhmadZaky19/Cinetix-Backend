const bookingModel = require("./bookingModel");
const helperWrapper = require("../../helpers/wrapper");

module.exports = {
  getBookingByIdBooking: async (req, res) => {
    try {
      const { idBooking } = req.params;
      // eslint-disable-next-line no-console
      console.log(idBooking);
      const result = await bookingModel.getBookingByIdBooking(idBooking);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by idBooking ${idBooking} not found !`,
          null
        );
      }
      return helperWrapper.response(res, 200, "Success get data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  getBookingByIdUser: async (req, res) => {
    try {
      const { id } = req.params;
      // eslint-disable-next-line no-console
      console.log(id);
      const result = await bookingModel.getBookingByIdUser(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by id ${id} not found !`,
          null
        );
      }
      return helperWrapper.response(res, 200, "Success get data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  getSeatBooking: async (req, res) => {
    try {
      const { schedule, movie, date, time } = req.query;
      const result = await bookingModel.getSeatBooking(
        schedule,
        movie,
        date,
        time
      );
      if (result.length < 1) {
        return helperWrapper.response(res, 404, "Data not found", null);
      }
      return helperWrapper.response(res, 200, "Success get data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  postBooking: async (req, res) => {
    try {
      const {
        userId,
        scheduleId,
        movieId,
        dateBooking,
        timeBooking,
        totalPayment,
        paymentMethod,
        statusPayment,
        seat,
      } = req.body;
      const setData = {
        userId,
        dateBooking,
        timeBooking,
        movieId,
        scheduleId,
        totalTicket: seat.length,
        totalPayment,
        paymentMethod,
        statusPayment,
        // seat,
      };
      let result = await bookingModel.postBooking(setData);
      seat.forEach(async (item) => {
        console.log(item);
        const setDataSeat = {
          bookingId: result.id,
          movieId,
          scheduleId,
          dateBooking,
          timeBooking,
          seat: item,
        };
        await bookingModel.postSeatBooking(setDataSeat);
      });
      result = { ...result, seat };
      return helperWrapper.response(res, 200, "Success post data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
};
