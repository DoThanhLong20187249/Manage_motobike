const express = require("express");
const multer = require("multer");
const upload = multer();
const router = express.Router();
const employeeController = require("../controller/employeeController");
const middlewareController = require("../middleware/middlewareController");

router
  .route("/")
  .get(
    middlewareController.verifyTokenAdmin,
    employeeController.getAllEmployee
  );
router
  .route("/add")
  .post(
    middlewareController.verifyTokenAdmin,
    upload.none(),
    employeeController.addEmployee
  );

router
  .route("/:id")
  .get(employeeController.getEmployeeById)
  .put(upload.none(), employeeController.updateEmployeeById)
  .delete(employeeController.deleteEmployeeById);
module.exports = router;
