const express = require('express');
const {
  fetchAllCategories,
  createCategory,
} = require('../controllers/category');

const router = express.Router();

router.get('/categories', fetchAllCategories);
router.post('/categories', createCategory);

module.exports = router;
