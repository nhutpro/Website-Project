const express = require("express");
const router = express.Router();
const account = require("../app/controllers/AccountController");
router.get("/user", account.user);
router.post("/login", account.login);
router.get("/recovery", account.recovery);
router.post("/register", account.login);
module.exports = router;
