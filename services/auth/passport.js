const passport = require('passport');
const User = require('../../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    
    console.log(`calling serializeUser`);
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    console.log(`calling deserializeUser`);
    User.findByUserName(username)
      .then(user => {
        console.log(`user found in deserializeUser `, user);
        return done(null, user);
      })
      .catch(err => {
        console.log(`error in deserializeUser `, err);
        return done(err, null);
      });
  });
};



