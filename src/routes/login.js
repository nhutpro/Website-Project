const express = require('express');
const router = express.Router();
const loginControler = require('../app/controllers/LoginController')


router.get('/:slug',loginControler.show)
router.get('/', loginControler.index);


module.exports = router;