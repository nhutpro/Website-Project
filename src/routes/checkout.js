const express = require("express");
const router = express.Router();
const CheckoutController = require("../app/controllers/CheckoutController");

router.get("/", CheckoutController.index);
module.exports = router;
