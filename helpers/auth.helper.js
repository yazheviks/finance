const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');

const Token = require('../models/token');
const { secret, tokens } = require('../config/app.config').jwt;

module.exports.generateAccessToken = (username, userId) => {
  const payload = {
    username,
    userId,
    type: tokens.access.type,
  };

  const options = { expiresIn: tokens.access.expiresIn }

  return jwt.sign(payload, secret, options);
};

module.exports.generateRefreshToken = () => {
  const payload = {
    id: v4(),
  };

  const options = { expiresIn: tokens.refresh.expiresIn };

  return {
    id: payload.id,
    token: jwt.sign(payload, secret, options),
  }
};

module.exports.replaceDbRefreshToken = async (tokenId, userId) => {
  try {
    await Token.findOneAndRemove({ userId });
    await Token.create({ tokenId, userId });
  } catch(error) {
    console.log(error);
  }
};
