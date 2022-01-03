const redis = require("../../config/redis");
const movieModel = require("./movieModel");
const helperWrapper = require("../../helpers/wrapper");
const deleteFile = require("../../helpers/uploads/deleteFile");

module.exports = {
  getAllMovie: async (request, response) => {
    try {
      let { month, search, sort, order, page, limit } = request.query;
      month = Number(month) || "";
      page = Number(page) || 1;
      limit = Number(limit) || 3;
      search = search || "";
      sort = sort || "id";
      order = order || "asc";
      const offset = page * limit - limit;
      const totalData = await movieModel.getCountMovie(month, search);
      const totalPage = Math.ceil(totalData / limit);
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const result = await movieModel.getAllMovie(
        month,
        search,
        sort,
        order,
        limit,
        offset
      );
      if (result.length < 1) {
        return helperWrapper.response(response, 200, "Movie not found", result);
      }
      if (page > totalPage) {
        return helperWrapper.response(response, 400, "Page not found", null);
      }

      redis.setex(
        `getMovie:${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify({ result, pageInfo })
      );

      return helperWrapper.response(
        response,
        200,
        "Success get data",
        result,
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
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await movieModel.getMovieById(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by id ${id} not found !`,
          null
        );
      }

      // PROSES MENYIMPAN DATA KEDALAM REDIS
      // ======
      redis.setex(`getMovie:${id}`, 3600, JSON.stringify(result));
      // ======
      return helperWrapper.response(res, 200, "Success get data by id", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  postMovie: async (req, res) => {
    try {
      const {
        name,
        category,
        director,
        casts,
        releaseDate,
        durationHour,
        durationMinute,
        synopsis,
      } = req.body;
      const setData = {
        name,
        category,
        director,
        casts,
        releaseDate,
        durationHour,
        durationMinute,
        synopsis,
        image: req.file ? req.file.filename : null,
      };
      const result = await movieModel.postMovie(setData);
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
  updateMovie: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await movieModel.getMovieById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by id ${id} not found !`,
          null
        );
      }
      const {
        name,
        category,
        director,
        casts,
        releaseDate,
        durationHour,
        durationMinute,
        synopsis,
      } = req.body;
      const setData = {
        name,
        category,
        director,
        casts,
        releaseDate,
        durationHour,
        durationMinute,
        synopsis,
        image: req.file ? req.file.filename : null,
        updatedAt: new Date(Date.now()),
      };
      Object.keys(setData).forEach((data) => {
        if (!setData[data]) {
          delete setData[data];
        }
      });
      if (req.file && checkId[0].image) {
        deleteFile(`public/uploads/movie/${checkId[0].image}`);
      }
      const result = await movieModel.updateMovie(setData, id);
      return helperWrapper.response(res, 200, "Success update data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await movieModel.getMovieById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by id ${id} not found !`,
          null
        );
      }
      if (checkId[0].image) {
        deleteFile(`public/uploads/movie/${checkId[0].image}`);
      }
      const result = await movieModel.deleteMovie(id);
      return helperWrapper.response(
        res,
        200,
        `Success delete data by id ${id}`,
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
