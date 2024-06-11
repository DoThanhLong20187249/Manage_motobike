const express = require("express");
const router = express.Router();
const multer = require("multer");
const midlewareController = require("../middleware/middlewareController");
const orderController = require("../controller/orderController");

router.get("/", orderController.getAllOrder);

router
  .delete("/:id", orderController.deleteOrder)
  .get("/:id", orderController.getOrderByID);

router.post("/add/:id", orderController.addNewOrder);

module.exports = router;
