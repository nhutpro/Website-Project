const express = require("express");
const router = express.Router();
const itemController = require("../app/controllers/ItemController");
const laptopController = require("../app/controllers/LaptopController");

router.post("/addcart", laptopController.addCart)
router.post("/checkout", laptopController.checkout)
router.get("/totalproduct", laptopController.totalproduct);
router.get("/info", laptopController.info);
router.get("/:slug", itemController.detailItem);
router.get("/", laptopController.index);
module.exports = router;
