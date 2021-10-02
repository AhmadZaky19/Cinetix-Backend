const express = require("express");

const Router = express.Router();

const userController = require("./userController");
const middlewareAuth = require("../../middleware/auth");
const middlewareUploadUser = require("../../middleware/uploadUser");

Router.get("/:id", userController.getUserById);
Router.patch("/", middlewareAuth.authentication, userController.updateUser);
Router.patch(
  "/update-password",
  middlewareAuth.authentication,
  userController.updatePassword
);
Router.patch(
  "/image",
  middlewareAuth.authentication,
  middlewareUploadUser,
  userController.updateImage
);

module.exports = Router;
