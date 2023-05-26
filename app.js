const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3002;
app.listen(PORT, function () {
    console.log(`listening on port: ${PORT}`);
});

const whitelist = ["https://musmanrao1994.github.io", "http://localhost:3006"]
app.use(cors({
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },

    // origin: "*", // (Whatever your frontend url is) 
    credentials: true, // <= Accept credentials (cookies) sent by the client
}));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },

    })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(path.join(__dirname, "client/build")));

// =============== Routes =============== \\
const favRoutes = require("./routes/favRoutes");
const ebayRoutes = require("./routes/ebay");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
app.use("/fav", favRoutes);
app.use("/ebayApi", ebayRoutes);
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);

// app.get("/api", function (req, res) {
//   res.send('working');
// });
app.get("/api/test", function (req, res) {
    res.json({
        status: 'working',
    })
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
