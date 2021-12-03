const express = require("express");
const router = express.Router();
const itemController = require("../app/controllers/ItemController");
const tabletController = require("../app/controllers/TabletController");

router.post("/addcart", tabletController.addCart)
router.post("/checkout", tabletController.checkout)
router.get("/totalproduct", tabletController.totalproduct);
router.get("/info", tabletController.info);
router.get("/:slug", itemController.detailItem);
router.get("/", tabletController.index);
module.exports = router;
