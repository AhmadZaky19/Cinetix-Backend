const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const helperWrapper = require("../../helpers/wrapper");
const authModel = require("./authModel");
const redis = require("../../config/redis");
const sendMail = require("../../helpers/email");

module.exports = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const checkUser = await authModel.getUserByEmail(email);
      if (
        firstName.length < 1 ||
        lastName.length < 1 ||
        email.length < 1 ||
        password.length < 1
      ) {
        return helperWrapper.response(
          res,
          400,
          "All input must be filled",
          null
        );
      }
      // PROSES PENGECEKAN EMAIL SUDAH PERNAH TERDAFTAR ATAU BELUM DI DATABASE
      if (checkUser.length > 0) {
        return helperWrapper.response(
          res,
          404,
          `User with email ${email} already exist`,
          null
        );
      }
      // PROSES ENCRYPT PASSWORD
      const hashedPassword = await bcrypt.hash(password, 10);
      const setData = {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        password: hashedPassword,
        image: req.file ? req.file.filename : null,
        role: "user",
      };

      const result = await authModel.register(setData);

      const setDataMail = {
        to: result.email,
        subject: "Email Verification",
        template: "email-verification",
        data: {
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
        },
      };

      await sendMail(setDataMail);
      return helperWrapper.response(res, 200, "Success register user", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  verifyUser: async (req, res) => {
    try {
      const { id } = req.params;

      await authModel.verifyUser("active", id);
      return helperWrapper.response(res, 200, "Success activate email");
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad Request (${error.message})`,
        null
      );
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkUser = await authModel.getUserByEmail(email);
      if (email.length < 1 || password.length < 1) {
        return helperWrapper.response(
          res,
          400,
          "All input must be filled",
          null
        );
      }
      if (checkUser.length < 1) {
        return helperWrapper.response(res, 404, "Wrong email/password", null);
      }

      const matchPassword = await bcrypt.compare(
        password,
        checkUser[0].password
      );
      if (!matchPassword) {
        return helperWrapper.response(res, 400, "Wrong email/password", null);
      }

      if (checkUser[0].status !== "active") {
        return helperWrapper.response(
          res,
          400,
          `Please verify email first`,
          null
        );
      }

      // PROSES UTAMA MEMBUAT TOKEN MENGGUNAKAN JWT (DATA YANG MAU DIUBAH, KATA KUNCI, LAMA TOKEN BISA DIGUNAKAN )
      const payload = checkUser[0];
      delete payload.password;
      const token = jwt.sign({ ...payload }, process.env.SECRET_KEY, {
        expiresIn: "3h",
      });
      // ADD REFRESH TOKEN
      const refreshToken = jwt.sign({ ...payload }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      return helperWrapper.response(res, 200, "Success login", {
        id: payload.id,
        token,
        refreshToken,
      });
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  logout: async (req, res) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];
      redis.setex(`accessToken:${token}`, 3600 * 24, token);
      return helperWrapper.response(res, 200, "Success logout", null);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      redis.get(`refreshToken:${refreshToken}`, (error, result) => {
        if (!error && result !== null) {
          return helperWrapper.response(
            res,
            403,
            "Your refresh token can't be use"
          );
        }
        jwt.verify(refreshToken, process.env.SECRET_KEY, (err, resultJwt) => {
          if (err) {
            return helperWrapper.response(res, 403, err.message);
          }
          delete resultJwt.iat;
          delete resultJwt.exp;
          const token = jwt.sign(resultJwt, process.env.SECRET_KEY, {
            expiresIn: "3h",
          });
          const newRefreshToken = jwt.sign(resultJwt, process.env.SECRET_KEY, {
            expiresIn: "24h",
          });
          redis.setex(`refreshToken:${refreshToken}`, 3600 * 24, refreshToken);
          return helperWrapper.response(res, 200, "Success Refresh Token !", {
            id: resultJwt.id,
            token,
            refreshToken: newRefreshToken,
          });
        });
      });
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
