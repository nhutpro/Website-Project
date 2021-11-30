const express = require("express");
const router = express.Router();
const search = require("../app/controllers/SearchController")


router.get("/match", search.match);
router.get("/global", search.global);
router.get("/", search.index);

module.exports = router;
