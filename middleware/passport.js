const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
const keys = require('../config/keys');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt,
}

module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    try {
      User.findOne({_id: jwt_payload.id}, (error, user) => {
        if (error) {
          return done(error, false);
        }

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }));
}
