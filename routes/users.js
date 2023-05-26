const express = require("express");
const usersRoutes = express.Router();
const usersByCookie = require('../usersByCookie.js');

usersRoutes.get('/', (req, res) => {

    
    console.log(`req.user =>>>`, usersByCookie, req.cookies.user);
    // console.log(`this is req.user =>>`, req.user, req.session.user, req.session.id, req.session.cookie.maxAge, req.session.views, req.sessionID
    // );
  res.json({ userInfo: usersByCookie[req.cookies.user] });
});

module.exports = usersRoutes;
