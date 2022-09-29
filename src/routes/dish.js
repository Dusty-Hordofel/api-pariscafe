const express = require('express');
const router = express.Router();

const {
  createDish,

  fetchDish,
  fetchDishById,
} = require('../controllers/dish');

router.post('/dishes', createDish);

router.param('id', fetchDish);
router.get('/dishes/:id', fetchDishById); //related to fetchDish

module.exports = router;
