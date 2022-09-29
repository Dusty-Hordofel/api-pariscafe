const Category = require('../models/category');
const createError = require('http-errors');
const { categorySchema } = require('../validators/schema-validator');
const mongoose = require('mongoose');

exports.getCategory = (req, res) => {
  //TODO: send the category to the client
  res.status(200).json(req.category); //req.category is the category we added to the request object in the getCategoryId function
};

exports.getCategoryId = async (req, res, next, id) => {
  try {
    //TODO: check if the id is valid
    const category = await Category.findById(id);
    //TODO: verify if the category exists
    if (!category) return next(createError(404, 'Category not found'));
    //TODO: add category to the request object
    req.category = category;
    //TODO: call next middleware
    next(); //we call the next function witch is the getCategory function in this case witch is at the top
  } catch (error) {
    console.log(
      '🚀 ~ file: category.js ~ line 24 ~ exports.getCategoryId=async ~ error',
      error
    );
    //TODO: handle invalid id error
    if (error instanceof mongoose.CastError) {
      //erroe instanceof mongoose.CastError is used to check if the error is a mongoose error
      return next(createError(400, 'Invalid Category Id'));
    }

    next(error);
  }
};

exports.fetchAllCategories = async (req, res, next) => {
  try {
    //TODO: fetch all categories
    const result = await Category.find({});

    //TODO: verify if there are categories
    if (result.length === 0) {
      console.log(
        '🚀 ~ file: category.js ~ line 53 ~ exports.getCategoryId=async ~ error',
        error
      );

      return next(createError(404, 'No categories found'));
    }

    //TODO: send all categories to the client
    res.status(200).json(result);
  } catch (error) {
    console.log(
      '🚀 ~ file: category.js ~ line 9 ~ exports.fetchAllCategories= ~ error',
      error
    );
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  const { name, addedBy } = req.body; //if we pass the whole req.body we don't have to destructure it

  try {
    //TODO: validate the request body
    const result = await categorySchema.validateAsync({ name }); //we can also pass the whole req.body
    //TODO: create instanceof Category model
    const category = new Category(result);
    category.addedBy = 'mpk';
    //TODO: create a new category
    const newCategory = await category.save();
    //TODO: send the new category to the client
    res.status(201).json(newCategory);
  } catch (error) {
    console.log('🚀 ~ file: category.js ~ line 36 ~ error', error);
    //TODO: error handling with joy
    if (error.isJoi === true) error.status = 422;
    //TODO: handle E11000 duplicate key error collection
    //if category already exists
    if (error.message.includes('E11000')) {
      return next(
        createError.Conflict(`Category name ${req.body.name} already exists `)
      );
    }
    //Other errors
    next(createError(error));
  }
  // res.status(201).json({ message: 'molimo sanot' });
};
