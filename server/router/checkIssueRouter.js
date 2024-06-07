const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const checkIssueController = require("../controller/checkIssueController");

router.route("/").get(checkIssueController.getAllcheckIssues);

router
  .route("/add")
  .get(checkIssueController.getInformationByID)
  .post(checkIssueController.addCheckIssue);

router
  .route("/:id")
  .delete(checkIssueController.deleteCheckIssue)
  .get(checkIssueController.getCheckIssueByID)
  .put(upload.none(), checkIssueController.updateCheckIssue);

module.exports = router;
