const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");
const middlewareController = require("../middleware/middlewareController");

router
  .route("/")
  .get(middlewareController.verifyToken ,customerController.getAllCustomer);
router.route("/:id").get(customerController.getCustomerById);

module.exports = router;
