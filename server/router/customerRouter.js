const express = require("express");
const multer = require("multer");
const uploadData = multer();
const router = express.Router();
const customerController = require("../controller/customerController");
const middlewareController = require("../middleware/middlewareController");

router.route("/").get(customerController.getAllCustomer);

router.route("/add").post(uploadData.none(),customerController.addCustomer);
router
  .route("/:id")
  .get(customerController.getCustomerById)
  .put(uploadData.none(),customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

module.exports = router;
