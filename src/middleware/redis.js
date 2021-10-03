const redis = require("../config/redis");
const helperWrapper = require("../helpers/wrapper");

module.exports = {
  getMovieByIdRedis: (req, res, next) => {
    const { id } = req.params;
    redis.get(`getMovie:${id}`, (error, result) => {
      if (!error && result !== null) {
        // eslint-disable-next-line no-console
        console.log("Data is in redis");
        const newResult = JSON.parse(result);
        return helperWrapper.response(
          res,
          200,
          "Success get data by id",
          newResult
        );
      }
      // eslint-disable-next-line no-console
      console.log("No data in redis");
      next();
    });
  },
  getMovieRedis: (req, res, next) => {
    redis.get(`getMovie:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result !== null) {
        // eslint-disable-next-line no-console
        console.log("Data is in redis");
        const newResult = JSON.parse(result);
        return helperWrapper.response(
          res,
          200,
          "Success get data",
          newResult.result,
          newResult.pageInfo
        );
      }
      // eslint-disable-next-line no-console
      console.log("No data in redis");
      next();
    });
  },
  clearMovieRedis: (req, res, next) => {
    redis.keys("getMovie:*", (error, result) => {
      if (result.length > 0) {
        result.forEach((item) => {
          redis.del(item);
        });
      }
      next();
    });
  },
  getScheduleByIdRedis: (req, res, next) => {
    const { id } = req.params;
    redis.get(`getSchedule:${id}`, (error, result) => {
      if (!error && result !== null) {
        // eslint-disable-next-line no-console
        console.log("Data is in redis");
        const newResult = JSON.parse(result);
        return helperWrapper.response(
          res,
          200,
          "Success get data by id",
          newResult
        );
      }
      // eslint-disable-next-line no-console
      console.log("No data in redis");
      next();
    });
  },
  getScheduleRedis: (req, res, next) => {
    redis.get(`getSchedule:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result !== null) {
        // eslint-disable-next-line no-console
        console.log("Data is in redis");
        const newResult = JSON.parse(result);
        return helperWrapper.response(
          res,
          200,
          "Success get data",
          newResult.result,
          newResult.pageInfo
        );
      }
      // eslint-disable-next-line no-console
      console.log("No data in redis");
      next();
    });
  },
  clearScheduleRedis: (req, res, next) => {
    redis.keys("getSchedule:*", (error, result) => {
      if (result.length > 0) {
        result.forEach((item) => {
          redis.del(item);
        });
      }
      next();
    });
  },
};
