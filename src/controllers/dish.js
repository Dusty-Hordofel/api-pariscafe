const Dish = require('../models/dish');
const createError = require('http-errors');
const { dishSchema } = require('../validators/schema-validator');
const mongoose = require('mongoose');

const imageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

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
    //TODO: add photo to the dish if it exists
    savePhoto(dish, photo);
    //TODO: save the dish to the database
    const newDish = await dish.save();
    //TODO: don't send photo data to the client
    newDish.photo = undefined;
    //TODO: send the new dish to the client
    res.status(201).json(newDish);
  } catch (error) {
    console.log(
      '🚀 ~ file: dish.js ~ line 34 ~ exports.createDish= ~ error',
      error
    );
    //TODO: error handling with joy
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
    //TODO: handle E11000 duplicate key error collection
    if (error.message.includes('E11000')) {
      return next(createError.Conflict(`The dish ${dish.name} already exists`));
    }

    next(error);
  }
};

function savePhoto(dish, photo) {
  //TODO: Handle empty object scenario using lodash

  if (photo != null && imageTypes.includes(photo.type)) {
    dish.photo.data = new Buffer.from(photo.data, 'base64'); // add photo data to the dish
    dish.photo.contentType = photo.type; //add photo contentType. This is important for the client to know what type of data it is receiving
  }
}
