const User = require("../models/user");
const createError = require("http-errors");
const { userSchema } = require("../validators/schema-validator");

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
