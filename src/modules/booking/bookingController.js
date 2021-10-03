const bookingModel = require("./bookingModel");
const helperWrapper = require("../../helpers/wrapper");

module.exports = {
  getBookingByIdBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await bookingModel.getBookingByIdBooking(id);

      const dataSeat = [];
      result.forEach((item) => {
        const data = item.seat;
        dataSeat.push(data);
        return data;
      });

      const loopBookingData = result.map((value) => {
        const data = value;
        return data;
      });
      const bookingData = loopBookingData[0];

      const newResult = {
        ...bookingData,
        seat: dataSeat,
      };
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by Id Booking ${id} not found !`,
          null
        );
      }
      return helperWrapper.response(res, 200, "Success get data", newResult);
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
      const result = await bookingModel.getBookingByIdUser(id);

      const dataSeat = [];
      result.forEach((item) => {
        const data = item.seat;
        dataSeat.push(data);
        return data;
      });

      const loppBookingData = result.map((value) => {
        const data = value;
        return data;
      });
      const bookingData = loppBookingData[0];

      const newResult = {
        ...bookingData,
        seat: dataSeat,
      };
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by id ${id} not found !`,
          null
        );
      }
      return helperWrapper.response(res, 200, "Success get data", newResult);
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
      };
      let result = await bookingModel.postBooking(setData);
      seat.forEach(async (item) => {
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
  updateTicketStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const checkBooking = await bookingModel.detailBookingById(id);
      if (checkBooking.length < 1) {
        return helperWrapper.response(res, 404, "Booking data not found", null);
      }

      const changeStatus = "notActive";
      const setData = {
        ...checkBooking.statusUsed,
        statusUsed: changeStatus,
        updatedAt: new Date(Date.now()),
      };
      const result = await bookingModel.updateTicketStatus(setData, id);
      if (checkBooking[0].statusUsed === "active") {
        return helperWrapper.response(res, 200, "Using ticket success", result);
      } else {
        return helperWrapper.response(res, 400, "Ticket already been used");
      }
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
