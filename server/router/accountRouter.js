const express = require("express");
const router = express.Router();
const accountController = require("../controller/accountController");
const middlewareController = require("../middleware/middlewareController");

router
  .route("/")
  .get( accountController.getAllAccount);

router.route("/:id").get(accountController.getAccountById);
module.exports = router;
