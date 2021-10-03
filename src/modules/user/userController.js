const bcrypt = require("bcrypt");
const helperWrapper = require("../../helpers/wrapper");
const userModel = require("./userModel");
const redis = require("../../config/redis");
const deleteFile = require("../../helpers/uploads/deleteFile");

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
      const { email, firstName, lastName, phoneNumber, role } = req.body;
      const setData = {
        email,
        firstName,
        lastName,
        phoneNumber,
        role,
        updatedAt: new Date(Date.now()),
      };
      Object.keys(setData).forEach((data) => {
        if (!setData[data]) {
          delete setData[data];
        }
      });
      deleteFile(`public/uploads/user/${checkId[0].image}`);
      const result = await userModel.updateUser(setData, id);
      return helperWrapper.response(res, 200, "Success update user", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  updatePassword: async (req, res) => {
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
      const { newPassword, confirmPassword } = req.body;
      if (newPassword !== confirmPassword) {
        return helperWrapper.response(res, 400, "Password not match", null);
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      const setData = {
        password: hashedNewPassword,
        updatedAt: new Date(Date.now()),
      };
      const result = await userModel.updatePassword(setData, id);
      return helperWrapper.response(
        res,
        200,
        "Success update password",
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
  updateImage: async (req, res) => {
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
      const setData = {
        image: req.file.filename,
        updatedAt: new Date(Date.now()),
      };

      const result = await userModel.updateImage(setData, id);
      return helperWrapper.response(res, 200, "Success update image", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  dashboard: async (req, res) => {
    try {
      const { movieId, location, premiere } = req.query;
      const result = await userModel.dashboard(movieId, location, premiere);
      if (result.length < 1) {
        return helperWrapper.response(res, 404, "Data not found", null);
      }
      return helperWrapper.response(
        res,
        200,
        "Success get dashboard data",
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