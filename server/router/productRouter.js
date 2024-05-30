const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const upload = require("../middleware/uploadImage");

router.route("/").get(productController.getAllProduct);

router
  .route("/add")
  .post(upload.single("image"), productController.addNewProduct);

router
  .route("/:id")
  .get(productController.getProductById)
  .post(upload.single("image"),productController.updateProductById)
  .delete(productController.deleteProductById);

module.exports = router;
