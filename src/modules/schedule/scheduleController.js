const redis = require("../../config/redis");
const scheduleModel = require("./scheduleModel");
const helperWrapper = require("../../helpers/wrapper");

module.exports = {
  getAllSchedule: async (request, response) => {
    try {
      let { location, movieId, sort, order, page, limit } = request.query;
      page = Number(page) || 1;
      limit = Number(limit) || 3;
      location = location || "";
      movieId = movieId || "";
      sort = sort || "price";
      order = order || "asc";
      const offset = page * limit - limit;
      const totalData = await scheduleModel.getCountSchedule(location, movieId);
      const totalPage = Math.ceil(totalData / limit);
      if (page > totalPage) {
        return helperWrapper.response(response, 400, "Page not found", null);
      }
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const result = await scheduleModel.getAllSchedule(
        location,
        movieId,
        sort,
        order,
        limit,
        offset
      );
      const newResult = result.map((item) => {
        const data = {
          ...item,
          time: item.time.split(","),
        };
        return data;
      });
      if (newResult.length < 1) {
        return helperWrapper.response(response, 404, "Data not found", null);
      }

      redis.setex(
        `getSchedule:${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify({ newResult, pageInfo })
      );

      return helperWrapper.response(
        response,
        200,
        "Success get schedule data",
        newResult,
        pageInfo
      );
    } catch (error) {
      return helperWrapper.response(
        response,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  getScheduleById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await scheduleModel.getScheduleById(id);
      const newResult = result.map((item) => {
        const data = {
          ...item,
          time: item.time.split(","),
        };
        return data;
      });
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by id ${id} not found !`,
          null
        );
      }

      redis.setex(`getSchedule:${id}`, 3600, JSON.stringify(newResult));

      return helperWrapper.response(
        res,
        200,
        "Success get schedule data",
        newResult
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  postSchedule: async (req, res) => {
    try {
      const { movieId, premiere, price, location, dateStart, dateEnd, time } =
        req.body;
      const setData = {
        movieId,
        premiere,
        price,
        location,
        dateStart,
        dateEnd,
        time,
      };
      const result = await scheduleModel.postSchedule(setData);
      return helperWrapper.response(
        res,
        200,
        "Success post schedule data",
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  updateSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await scheduleModel.getScheduleById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by id ${id} not found !`,
          null
        );
      }
      const { movieId, premiere, price, location, dateStart, dateEnd, time } =
        req.body;
      const setData = {
        movieId,
        premiere,
        price,
        location,
        dateStart,
        dateEnd,
        time,
        updatedAt: new Date(Date.now()),
      };
      Object.keys(setData).forEach((data) => {
        if (!setData[data]) {
          delete setData[data];
        }
      });
      const result = await scheduleModel.updateSchedule(setData, id);
      return helperWrapper.response(
        res,
        200,
        "Success update schedule data",
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  deleteSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await scheduleModel.getScheduleById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by id ${id} not found !`,
          null
        );
      }
      const result = await scheduleModel.deleteSchedule(id);
      return helperWrapper.response(
        res,
        200,
        `Success delete schedule data by id ${id}`,
        result
      );
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
