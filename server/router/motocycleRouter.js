const express = require("express");
const router = express.Router();
const motocycleController = require("../controller/motocycleController");

router.route("/add").post(motocycleController.addMotocycle);
router.route("/").get(motocycleController.getAllMotocycle);
router.route("/:id").get(motocycleController.getMotocycleById);

module.exports = router;