const Category = require('../models/category');

exports.fetchAllCategories = async (req, res) => {
  try {
    //TODO: fetch all categories
    const result = await Category.find({});
    //TODO: send all categories to the client
    res.status(200).json(result);
  } catch (error) {
    console.log(
      '🚀 ~ file: category.js ~ line 9 ~ exports.fetchAllCategories= ~ error',
      error
    );
  }
};
