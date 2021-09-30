const express = require("express");

const Router = express.Router();

const userController = require("./userController");
const middlewareAuth = require("../../middleware/auth");
const middlewareUpload = require("../../middleware/uploadMovie");

Router.get("/:id", userController.getUserById);
Router.patch(
  "/",
  middlewareAuth.authentication,
  middlewareUpload,
  userController.updateUser
);

module.exports = Router;
