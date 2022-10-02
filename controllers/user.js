const User = require('../models/user');

exports.createUser = async (req, res, next) => {
  let user;
  try {
  } catch (error) {
    //TODO: create a new user
    user = new User(req.body);
    //TODO:save new user
    const newUser = await user.save();
    //TODO: send the newUser to the client
    res.status(201).json(newUser);
    console.log(
      '🚀 ~ file: user.js ~ line 8 ~ exports.createUser= ~ error',
      error
    );
    next(error);
  }
  //   res.status(201).json({ message: 'user created successfully' });
};
