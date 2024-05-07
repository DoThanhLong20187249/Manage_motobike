const express = require("express");
const route = express.Router();
const authController = require("../controller/authentication/authController");
const middlewareController = require("../middleware/middlewareController");

// Register
route.route("/register").post(authController.registerUser);

// Login
route.route("/login").post(authController.loginUser);

//Refresh 
route.route("/refresh").post(authController.requestRefreshToken);

//Logout

route.route("/logout").post(middlewareController.verifyToken,authController.userLogout);

module.exports = route;