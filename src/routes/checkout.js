const express = require("express");
const router = express.Router();
const CheckoutController = require("../app/controllers/CheckoutController");

router.get("/", CheckoutController.index);
router.put("/add-items", CheckoutController.addItem);
router.put("/subtract-items", CheckoutController.subtractItem);
router.delete("/:id", CheckoutController.removeItem);
router.post("/purchase", CheckoutController.purchaseCart);
module.exports = router;
