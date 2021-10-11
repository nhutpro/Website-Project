const express = require('express');
const router = express.Router();
const phoneController = require('../app/controllers/PhoneController')


router.get('/:slug',phoneController.show)
router.get('/', phoneController.index);


module.exports = router;