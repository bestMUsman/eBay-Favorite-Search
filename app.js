const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
var session = require('cookie-session');
const passport = require("passport");
var http = require('http');

require("dotenv").config();

const app = express();

// http.createServer(app).listen(80);




const PORT = process.env.PORT || 3002;
app.listen(PORT, function () {
    console.log(`listening on port: ${PORT}`);
});


app.use(cors({
    credentials: true, // <= Accept credentials (cookies) sent by the client

    origin: function (origin, callback) {
        return callback(null, true);
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },

    // origin: "*", // (Whatever your frontend url is) 
}));

app.options('*', cors());

app.use(logger("dev"));

app.use(methodOverride("_method"));
app.use(cookieParser('foo'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(
    session({
        name: "__session",
        keys: ["key1"],
        maxAge: 24 * 60 * 60 * 100,
        secure: false,
        httpOnly: true,
        sameSite: 'none',
        secret: 'foo',
        resave: true,
        saveUninitialized: true,
        cookie: {secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

// =============== Routes =============== \\
const favRoutes = require("./routes/favRoutes");
const ebayRoutes = require("./routes/ebay");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
app.use("/fav", favRoutes);
app.use("/ebayApi", ebayRoutes);
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);



app.get("/api/test", function (req, res) {
    res.json({
        status: 'working',
    })
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
