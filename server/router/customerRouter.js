const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");

router
  .route("/")
  .get(customerController.verifyToken, customerController.getAllCustomer);
router.route("/:id").get(customerController.getCustomerById);

module.exports = router;
