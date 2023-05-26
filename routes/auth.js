const express = require('express');
const controller = require('../controllers/usersController');
const usersByCookie = require('../usersByCookie');

const router = express.Router();

const authHelpers = require('../services/auth/authHelpers');
const passport = require('../services/auth/local');

router.get('/login', (req, res) => {
    console.log(`this is /login`, req.user);
    res.json({ message: 'login failed' })
});

router.get('/register', (req, res) => {
    res.json(res);
});

router.post('/register', controller.create);

router.post('/login/', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) {
            /* something */
        }
        if (user) {
            req.logIn(user, function (err) {


                var randomNumber = Math.random().toString();
                randomNumber = randomNumber.substring(2, randomNumber.length);
                let options = {
                    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                    secure: true,
                    secret: "sdfsdf",
                    sameSite: 'none',
                    httpOnly: true, // The cookie only accessible by the web server
                }

                usersByCookie[randomNumber] = user;
                res.cookie('user', randomNumber, options);
            });
        }

        res.json({ userInfo: user, state: req.isAuthenticated() });
    })(req, res, next);
})


router.get('/logout', (req, res) => {
    delete usersByCookie[req.cookies.user]
    req.logout();
    res.redirect('/');
});

module.exports = router;
