const User = require("../models/user");
const createError = require("http-errors");
const { userSchema } = require("../validators/schema-validator");

exports.getUserAddress = (req, res, next) => {
  const address = req.internal_user.address;

  if (!address) {
    return next(createError(404, "Address not found"));
  }

  res.status(200).json(address);
};

exports.updateAddress = async (req, res, next) => {
  const user = req.internal_user;
  const address = req.body;

  try {
    const updatedUserObject = await User.findByIdAndUpdate(
      { _id: user._id },
      { address },
      {
        new: true,
        runValidators: true,
        context: "query",
        useFindAndModify: false,
      }
    );

    res.status(200).json(updatedUserObject.address);
  } catch (error) {
    console.log(
      "🚀 ~ file: user.js ~ line 20 ~ exports.updateAddress= ~ error",
      error
    );
    next(createError(error));
  }
};

exports.getUserById = (req, res) => {
  console.log(req.internal_user);
  res.status(200).json(req.internal_user);
};

exports.fetchById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      console.log(
        "🚀 ~ file: user.js ~ line 67 ~ exports.updateAddress= ~ error",
        error
      );
      console.log(
        "🚀 ~ file: user.js ~ line 66 ~ exports.updateAddress= ~ error",
        error
      );
      console.log(
        "🚀 ~ file: user.js ~ line 66 ~ exports.updateAddress= ~ error",
        error
      );
      return next(createError(404, "User not found"));
    }

    req.internal_user = user;
    next();
  } catch (error) {
    console.log(
      "🚀 ~ file: user.js ~ line 18 ~ exports.fetchById= ~ error",
      error
    );
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  console.log(req.user);
  let user;

  try {
    const validated = await userSchema.validateAsync(req.body);
    user = new User(validated);
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;

    if (error.message.includes("E11000")) {
      console.log(
        "🚀 ~ file: user.js ~ line 75 ~ exports.fetchById= ~ error",
        error
      );
      console.log(
        "🚀 ~ file: user.js ~ line 75 ~ exports.fetchById= ~ error",
        error
      );
      return next(
        createError.Conflict(`User with email ${user.email} already exists`)
      );
    }
    console.log(
      "🚀 ~ file: user.js ~ line 16 ~ exports.createUser= ~ error",
      error
    );
    next(error);
  }
};

/*const User = require("../models/user");
const createError = require("http-errors");
const { userSchema } = require("../validators/schema-validator");

exports.getUserAddress = (req, res, next) => {
  //TODO: get user object
  const address = req.internal_user.address;
  //TODO: if address don't exist, throw error
  if (!address) {
    return next(createError(404, "Address not found"));
  }
  //TODO: send address to the client
  res.status(200).json(address);
};

exports.updateAddress = async (req, res, next) => {
  //TODO: get user object
  const user = req.internal_user;
  //TOODO: retrieve user data from body
  const address = req.body;

  try {
    // TODO:update user
    const updatedUserObject = await User.findByIdAndUpdate(
      { _id: user._id },
      { address },
      {
        new: true,
        runValidators: true,
        context: "query",
        useFindAndModify: false,
      }
    );
    //TODO: send updated user object to the client
    res.status(200).json(updatedUserObject.address);
  } catch (error) {
    console.log(
      "🚀 ~ file: user.js ~ line 20 ~ exports.updateAddress= ~ error",
      error
    );
    next(createError(error));
  }
};

exports.getUserById = (req, res) => {
  console.log(req.internal_user);
  //TODO: send requested user to the client
  res.status(200).json(req.internal_user);
};

exports.fetchById = async (req, res, next, id) => {
  try {
    // TODO: get user from database using id
    const user = await User.findById(id);
    //TODO: if user is not found, throw error
    if (!user) {
      return next(createError(404, "User not found"));
    }
    //TODO: create user object
    req.internal_user = user; //create a user object
    //TODO: go to the next function (getUserById,updateAddress...)
    next();
  } catch (error) {
    console.log(
      "🚀 ~ file: user.js ~ line 21 ~ exports.fetchById= ~ error",
      error
    );
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  console.log(req);
  console.log(req.user);
  console.log(req.user.sub);
  let user;
  try {
    //TODO: validate userSchema
    const validated = await userSchema.validateAsync(req.body);
    //TODO: create a new user
    user = new User(validated);
    //TODO:save new user
    const newUser = await user.save();
    //TODO: send the newUser to the client
    res.status(201).json(newUser);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;

    if (error.message.includes("E11000")) {
      return next(
        createError.Conflict(`User with email ${user.email} already exists`)
      );
    }
    console.log(
      "🚀 ~ file: user.js ~ line 25 ~ exports.createUser= ~ error",
      error
    );
    next(error);
  }
  //   res.status(201).json({ message: 'user created successfully' });
// };*/
