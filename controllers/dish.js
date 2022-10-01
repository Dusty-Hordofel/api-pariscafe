const Dish = require('../models/dish');
const createError = require('http-errors');
const { dishSchema } = require('../validators/schema-validator');
const mongoose = require('mongoose');

const imageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

exports.searchByCategory = async (req, res, next) => {
  //TODO:retrieve categories from the body
  let { categories } = req.body;
  //TODO: define the criteria const to search by category
  let criteria = {};

  try {
    //TODO: if categories is empty, throw an error
    if (categories.length === 0) {
      return next(createError(404, 'No categories specified'));
    }

    //TODO: define criteria by category
    criteria = { category: { $in: categories } }; //$in is a MongoDB operator that selects the documents where the value of a field equals any value in the specified array.
    //TODO: find dishes by category
    const result = await Dish.find(criteria)
      .select('-photo')
      .populate('category', '_id name');
    //TODO/ send the result to the client
    res.status(200).json(result);
  } catch (error) {
    console.log(
      '🚀 ~ file: dish.js ~ line 32 ~ exports.searchByCategory= ~ error',
      error
    );

    next(error);
  }
};

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
      error.status = 422;
    }
    //TODO: handle E11000 duplicate key error collection
    if (error.message.includes('E11000')) {
      return next(createError.Conflict(`The dish ${dish.name} already exists`));
    }

    next(error);
  }
};

exports.fetchDishes = async (req, res, next) => {
  try {
    //TODO: fetch all dishes from the database without photo data and populate category _id & name data
    const dishes = await Dish.find()
      .select('-photo')
      .populate('category', '_id, name');
    //TODO: if there are no dishes, throw an error
    if (dishes.length === 0) throw createError(400, 'No Disheses found');
    //TODO: send the dishes to the client
    res.status(200).json(dishes);
  } catch (error) {
    console.log(
      '🚀 ~ file: dish.js ~ line 63 ~ exports.fetchDishes= ~ error',
      error
    );
    next(error);
  }
};

exports.getDishPhoto = (req, res) => {
  //TODO: use created requested dish to get photo data
  const dish = req.dish; //req.dish from fetchDish()
  //TODO: if the dish have photo data, send it to the client
  if (dish.photo.data) {
    res.set('Content-Type', dish.photo.contentType); //we use set('Content-Type',...) is used to set the Content-Type HTTP header
    res.send(dish.photo.data); // send the photo data to the client
  } else {
    return res.status(204).json({ message: 'No data Found' }); // if the dish doesn't have a photo, throw an error
  }
};

exports.fetchDishById = (req, res) => {
  //TODO: findById without dish photo
  req.dish.photo = undefined;
  //TODO: send requested dish to the client
  res.status(200).json(req.dish); //req.dish from fetchDish()
};

exports.fetchDish = async (req, res, next, id) => {
  try {
    //TODO: fetch the dish from the database
    const dish = await Dish.findById(id);
    //TODO: if the dish doesn't exist, throw an error
    if (!dish) throw createError(404, 'Dish not found');
    //TODO: attach the dish to the request object
    req.dish = dish;
    //TODO: move to the next middleware
    next(); //next refers to the next function (like updateDishes,getDishesById....)
  } catch (error) {
    console.log(
      '🚀 ~ file: dish.js ~ line 59 ~ exports.fetchDish= ~ error',
      error
    );
    //TODO: handle mongoose cast error
    if (error instanceof mongoose.CastError) {
      return next(createError(400, 'Invalid Dish Id'));
    }

    next(error); //to the next errors
  }
};

function savePhoto(dish, photo) {
  //TODO: Handle empty object scenario using lodash

  if (photo != null && imageTypes.includes(photo.type)) {
    dish.photo.data = new Buffer.from(photo.data, 'base64'); // add photo data to the dish
    dish.photo.contentType = photo.type; //add photo contentType. This is important for the client to know what type of data it is receiving
  }
}
