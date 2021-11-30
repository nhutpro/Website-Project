const express = require("express");
const router = express.Router();
const search = require("../app/controllers/SearchController")

router.get("/", search.index);
router.get("/global", search.global);


module.exports = router;
