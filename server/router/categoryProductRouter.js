const express = require("express");
const router = express.Router();

const categoryProductController = require("../controller/categoryProductController");
const middlewareController = require("../middleware/middlewareController");
const uploadCloud = require("../middleware/uploadImage");

router.get(
  "/",
  middlewareController.verifyToken,
  categoryProductController.getAllCategoryProduct
);

router.post(
  "/add",
  uploadCloud.single("image"),
  categoryProductController.addCategoryProduct
);
router
  .route("/:id")
  .get(categoryProductController.getCategoryProductById)
  .put(
    uploadCloud.single("image"),
    categoryProductController.updateCategoryProduct
  );

module.exports = router;
