const express = require('express');
const router = express.Router();

const { createDish } = require('../controllers/dish');

router.post('/dishes', createDish);

module.exports = router;
