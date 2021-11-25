const express = require("express");
const router = express.Router();
const purchase = require("../app/controllers/PurchaseController")


router.get("/delivered", purchase.delivered);
router.get("/delivering", purchase.delivering);
router.get("/all", purchase.all);
router.get("/", purchase.index);

module.exports = router;
