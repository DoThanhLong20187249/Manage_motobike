const express = require("express");
const multer = require("multer");
const upload = multer();
const router = express.Router();
const motocycleController = require("../controller/motocycleController");
const midldlewareController = require("../middleware/middlewareController");


router.route("/").get(motocycleController.getAllMotocycle);
router
  .route("/:id")
  .get(midldlewareController.verifyToken, motocycleController.getMotocycleById)
  .put(
    midldlewareController.verifyToken,
    upload.none(),
    motocycleController.updateMotocycleById
  )
  .delete(
    midldlewareController.verifyToken,
    motocycleController.deleteMotocycle
  );

module.exports = router;
