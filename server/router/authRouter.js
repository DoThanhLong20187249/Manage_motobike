const express = require("express");
const route = express.Router();
const authController = require("../controller/authentication/authController");


// Register
route.route("/register").post(authController.registerUser);

// Login
route.route("/login").post(authController.loginUser);



module.exports = route;