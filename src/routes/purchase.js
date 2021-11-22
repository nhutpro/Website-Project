const express = require("express");
const router = express.Router();
const purchase = require("../app/controllers/PurchaseController")

router.get("/", purchase.index);

module.exports = router;
