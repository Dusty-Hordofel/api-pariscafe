const Dish = require('../models/dish');
const createError = require('http-errors');
const { dishSchema } = require('../validators/schema-validator');
const mongoose = require('mongoose');

exports.createDish = async (req, res, next) => {
  //TODO: retrieve category data from the body
  const { name, description, price, category, photo } = req.body;

  console.log(req.body);

  let dish;

  try {
    //TODO: validate the request body
    const result = await dishSchema.validateAsync({
      name,
      description,
      price,
      category,
    });
    //TODO: create a new dish
    dish = new Dish(result);
    // dish = new Dish({ name, description, price, category });

    dish.addedBy = 'mpk';
    //TODO: save the dish to the database

    const newDish = await dish.save();
    //TODO: send the new dish to the client
    res.status(201).json(newDish);
  } catch (error) {
    console.log(
      '🚀 ~ file: dish.js ~ line 34 ~ exports.createDish= ~ error',
      error
    );
    if (error.isJoi === true) {
      console.log(
        '🚀 ~ file: dish.js ~ line 39 ~ exports.searchByCategory= ~ error',
        error
      );
      console.log(
        '🚀 ~ file: dish.js ~ line 43 ~ exports.searchByCategory= ~ error',
        error
      );
      error.status = 422;
    }

    if (error.message.includes('E11000')) {
      return next(createError.Conflict(`The dish ${dish.name} already exists`));
    }

    next(error);
  }
};
