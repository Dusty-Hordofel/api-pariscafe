const express = require('express');
const router = express.Router();

const {
  createDish,

  fetchDish,
  fetchDishById,
  fetchDishes,
} = require('../controllers/dish');

router.post('/dishes', createDish);
router.get('/dishes', fetchDishes);

router.param('id', fetchDish);
router.get('/dishes/:id', fetchDishById); //related to fetchDish

module.exports = router;
