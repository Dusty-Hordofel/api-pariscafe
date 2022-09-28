const express = require('express');
const { fetchAllCategories } = require('../controllers/category');
const router = express.Router();

router.get('/categories', fetchAllCategories);

module.exports = router;
