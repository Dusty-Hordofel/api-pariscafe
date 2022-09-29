const mongoose = require('mongoose');

const dishSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxLength: 25,
    },
    description: {
      type: String,
      required: true,
      maxLength: 200,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    photo: {
      data: Buffer, //Buffer is a global object in node js that is used to store binary data
      contentType: String,
    },
    addedBy: {
      type: String,
      required: true,
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Dish', dishSchema);
