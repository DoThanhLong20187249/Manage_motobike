const express = require("express");
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
  .post(middlewareController.verifyTokenAdmin, employeeController.addEmployee);

router.route("/:id").get(employeeController.getEmployeeById);
module.exports = router;
