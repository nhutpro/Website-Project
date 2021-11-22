const express = require("express");
const router = express.Router();
const account = require("../app/controllers/AccountController");

router.get("/user", account.user);
router.post("/login", account.login);
router.post("/recovery/update", account.recoveryUpdate);
router.post("/recovery/confirm", account.recoveryConfirm);
router.post("/recovery", account.recovery);
router.post("/register/confirm", account.registerConfirm);
router.post("/register", account.register);
module.exports = router;
