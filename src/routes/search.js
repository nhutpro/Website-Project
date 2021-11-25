const express = require("express");
const router = express.Router();
const search = require("../app/controllers/SearchController")

// router.get("/:slug", search.index);s

router.get("/", search.index);

module.exports = router;
