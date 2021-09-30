const helperWrapper = require("../../helpers/wrapper");
const userModel = require("./userModel");
const redis = require("../../config/redis");

module.exports = {
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await userModel.getUserById(id);
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
      redis.setex(`getUser:${id}`, 3600, JSON.stringify(result));
      // ======
      return helperWrapper.response(
        res,
        200,
        `Success get data by id: ${id}`,
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
  updateUser: async (req, res) => {
    try {
      const { id } = req.decodeToken;
      const checkId = await userModel.getUserById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by id ${id} not found !`,
          null
        );
      }
      const { email, firstName, lastName, phoneNumber, image, role } = req.body;
      const setData = {
        email,
        firstName,
        lastName,
        phoneNumber,
        image,
        role,
        updatedAt: new Date(Date.now()),
      };
      Object.keys(setData).forEach((data) => {
        if (!setData[data]) {
          delete setData[data];
        }
      });
      const result = await userModel.updateUser(setData, id);
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
};
