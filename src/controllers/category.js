const Category = require('../models/category');
const createError = require('http-errors');
const { categorySchema } = require('../validators/schema-validator');
const mongoose = require('mongoose');

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
