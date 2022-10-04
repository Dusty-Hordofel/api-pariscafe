const User = require("../models/user");
const createError = require("http-errors");
const { userSchema } = require("../validators/schema-validator");

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
    //TODO: go to the next function (getUserById,updateUser....)
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
};
