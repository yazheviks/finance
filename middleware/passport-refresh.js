const RefreshTokenStrategy = require('passport-refresh-token').Strategy;
const Token = require('../models/token');

module.exports = passport => {
  passport.use(new RefreshTokenStrategy(
    (tokenId, done) => {
      Token.findOne({ tokenId }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));
}

