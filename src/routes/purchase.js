const express = require("express");
const router = express.Router();
const purchase = require("../app/controllers/PurchaseController")


router.post("/repurchase", purchase.checkout);
router.get("/delivered", purchase.delivered);
router.get("/delivering", purchase.delivering);
router.get("/all", purchase.all);
router.delete("/:id", purchase.removeItem)
router.get("/emptylist", purchase.EmptyList)
router.get("/", purchase.index);

module.exports = router;
