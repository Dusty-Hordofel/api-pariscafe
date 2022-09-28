const express = require('express');
const {
  fetchAllCategories,
  createCategory,
  getCategoryId,
  getCategory,
} = require('../controllers/category');

const router = express.Router();

router.get('/categories', fetchAllCategories);
router.post('/categories', createCategory);

router.param('id', getCategoryId);

router.get('/categories/:id', getCategory); //id will match with id in the getCategoryId function

module.exports = router;
