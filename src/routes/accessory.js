const express = require("express");
const router = express.Router();
const itemController = require("../app/controllers/ItemController");
const accessoryController = require("../app/controllers/AccessoryController");

router.get("/:slug", itemController.detailItemAccessory);
router.post("/addcart", accessoryController.addCart);
router.post("/checkout", accessoryController.checkout);
router.get("/totalproduct", accessoryController.totalproduct);
router.get("/info", accessoryController.info);
router.get("/", accessoryController.index);
module.exports = router;
