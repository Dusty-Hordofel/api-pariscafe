const Category = require('../models/category');
const createError = require('http-errors');

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
