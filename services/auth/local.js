const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;

const init = require('./passport');
const User = require('../../models/user');
const authHelpers = require('./authHelpers');

const options = {};

init();

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    console.log(`starting BasicStrategyBasicStrategyBasicStrategy`);
    User.findByUserName(username)
      .then(user => {
        console.log(`this is user =>`, user);
        if (!user) {
            console.log(`BasicStrategy !user`);
          return done(null, false);
        }
        if (!authHelpers.comparePass(password, user.password)) {
            console.log(`BasicStrategy !passwords not same`);

          return done(null, false);
        } else {
        //   req.cookies.user = user;
        console.log(`BasicStrategy !good to go`);

          return done(null, user);
        }
      })
      .catch(err => {
        console.log(`BasicStrategy !some other error`, err);

        return done(err);
      });
  })
);

module.exports = passport;
