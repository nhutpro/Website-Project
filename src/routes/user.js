const express = require("express");
const router = express.Router();
const account = require("../app/controllers/AccountController");

router.get("/info", account.userInfo);
router.post("/update", account.update);
module.exports = router;
