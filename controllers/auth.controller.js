const User = require('../models/user.model');
const Role = require('../models/role.model');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports.getUsers = async (request, response) => {
  try {
    const users = await User.find({});
    response.send(users)
  } catch (error) {
    console.log(error);
  }
}

module.exports.register = async (request, response) => {
  try {
    const errors = validationResult(request);

    const { username, password } = request.body;
    const candidate = await User.findOne({ username });

    if (candidate) {
      response.status(404).json({
        message: 'User is already registered. Try to log in.',
      });
    }

    if (!errors.isEmpty()) {
      response.status(400).json({
        message: 'Something went wrong',
      });
    }

    const userRole = await Role.findOne({ value: 'USER' });

    const user = new User({
      username,
      password: bcrypt.hashSync(password, 7),
      roles: [userRole.value],
    });

    await user.save();
    response.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
}

module.exports.login = async (request, response) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });

    if (!user) {
      response.status(400).json({
        message: 'Please, register first.',
      });
    }

    const passwordCheck = bcrypt.compareSync(password, user.password);

    if (!passwordCheck) {
      response.status(401).json({
        message: 'Password is incorrect',
      });
    }

    const token = jwt.sign({
      username,
      id: user._id,
    }, keys.jwt, { expiresIn: 3600 });

    response.status(200).json({
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.log(error);
  }
}
