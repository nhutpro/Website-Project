const express = require('express');
const router = express.Router();
const itemController = require('../app/controllers/ItemController');
const phoneController = require('../app/controllers/PhoneController');

router.get('/:slug', itemController.detailItem);
router.get('/', phoneController.index);

module.exports = router;
