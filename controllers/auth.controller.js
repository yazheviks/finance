const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const User = require('../models/user.model');
const Role = require('../models/role.model');
const Token = require('../models/token');
const keys = require('../config/app.config');
const authHelper = require('../helpers/auth.helper');

const updateTokens = async (username, userId) => {
  const refreshToken = await authHelper.generateRefreshToken();
  await authHelper.replaceDbRefreshToken(refreshToken.id, userId);
  return authHelper.generateAccessToken(username, userId);
};

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
      console.log(errors);
      response.status(400).json(errors.array());
      return;
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

    const token = await updateTokens(username, user._id);
    console.log('token', token);

    response.status(200).json({
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports.refreshTokens = async (request, result) => {
  const { refreshToken } = request.body;
  let payload;

  try {
    payload = jwt.verify(refreshToken, keys.jwt.secret);

    if (payload.type !== 'refresh') {
      result.status(400).json({ message: 'Invalid token' });
      return;
    }

    const token = await Token.findOne({ tokenId: payload.id });
    if (token === null) {
      throw new Error('Invalid token');
    }

    const tokens = await updateTokens(token.username, token.userId);
    return result.json(tokens);
  } catch(error) {
    if (error instanceof jwt.TokenExpiredError) {
      result.status(400).json({ message: 'Token expired' });
      return;
    } else if (error instanceof jwt.JsonWebTokenError) {

      result.status(400).json({ message: 'Invalid token' });
      return;
    }
  }
};

