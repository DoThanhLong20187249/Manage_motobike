const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");
const middlewareController = require("../middleware/middlewareController");

router.route("/").get(customerController.getAllCustomer);

router.route("/add").post(customerController.addCustomer);
router.route("/:id").get(customerController.getCustomerById);

module.exports = router;
