const jwt = require('jsonwebtoken');
const secret = require('../config/app.config');

module.exports = (request, response, next) => {
  const authHeader = request.get('Authorization');

  if (!authHeader) {
    return response.status(401).json({ message: 'Token is not provided' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, secret.jwt.secret);

    if(payload.type !== 'access') {
      return response.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return response.status(401).json({ message: 'Invalid token' });
    } else if (error instanceof  jwt.TokenExpiredError) {
      return response.status(401).json({ message: 'Token expired' });
    }
  }

  next();
}
