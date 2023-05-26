const express = require("express");
const usersRoutes = express.Router();

usersRoutes.get('/', (req, res) => {
    
    console.log(`this is req.user =>>`, req.user, req.session.user, req.session.id, req.session.cookie.maxAge, req.session.views, req.sessionID
    );
  res.json({ userInfo: req.user });
});

module.exports = usersRoutes;
