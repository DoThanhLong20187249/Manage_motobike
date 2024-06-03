const express = require("express");
const multer = require("multer");
const upload = multer();
const router = express.Router();
const categoryIssueController = require("../controller/categoryIssueController");

router.route("/").get(categoryIssueController.getAllCategoryIssues);
router
  .route("/add")
  .post(upload.none(), categoryIssueController.addNewCategoryIssue);

router
  .route("/:id")
  .get(categoryIssueController.getCategoryIssueById)
  .put(upload.none(), categoryIssueController.updateCategoryIssue)
  .delete(categoryIssueController.deleteCategoryIssue);

module.exports = router;
