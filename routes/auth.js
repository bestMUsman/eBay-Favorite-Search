const express = require('express');
const controller = require('../controllers/usersController');

const router = express.Router();

const authHelpers = require('../services/auth/authHelpers');
const passport = require('../services/auth/local');

router.get('/login', (req, res) => {
  res.json({ message: 'login failed' })
});

router.get('/register', (req, res) => {
  res.json(res);
});

router.post('/register', controller.create);

// router.post('/login', function(req, res, next) {
//     passport.authenticate('local', function(err, user, info) {
//         console.log(`this is lasssssssst`, err, user, info);
//       if (err) { return next(err); }
//       // Redirect if it fails
//     //   if (!user) { return res.redirect('/auth/login'); }
//       req.logIn(user, function(err) {
//         if (err) { return next(err); }
//         // Redirect if it succeeds
//         // req.user = user;
//         req.session.user = user;
//         req.session.views = 100;
//         console.log(`req.login user=>>`, user);
//         console.log(`req.login req.user=>>`, req.user);
//         // req.session.save(function(err) {
//         //     return Promise.resolve();
//         // });

//         res.cookie('access_token', req.ses, { maxAge: 900000, httpOnly: true });


//         // console.log(`from passport req.session.id`, req.session.id, req.session.cookie.maxAge, req.session.views, req.sessionID
//         // );
//         return res.redirect('/api/user');
//       });
//     })(req, res, next);
//   });

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/api/user',
    failureRedirect: '/auth/login',
    failureFlash: false,
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
