const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
var session = require('cookie-session');
const passport = require("passport");
var http = require('http');

require("dotenv").config();

const app = express();
app.set('trust proxy', 1);


const PORT = process.env.PORT || 3002;
app.listen(PORT, function () {
    console.log(`listening on port: ${PORT}`);
});


app.use(cors({
    origin: function (origin, callback) {
        return callback(null, true);
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },

    // origin: "*", // (Whatever your frontend url is) 
    credentials: true, // <= Accept credentials (cookies) sent by the client
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
         res.send(200);
     } else {
         next();
     }
    });

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(methodOverride("_method"));
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 3600000, httpOnly: false, },

    })
);
app.use(cookieParser());

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

function test(req, res) {
    console.log(`testtesttest`);
    var sess = req.session;
    console.log('before', sess);
    if (sess.views) {
        sess.views++
        req.session.save();
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + sess.views + '</p>')
        res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
        res.end();
    } else {
        sess.views = 1;
        req.session.save();
        res.end('welcome to the session demo. refresh!')
    }
    console.log('after', sess);
    return;
}


app.get('/api/testlast', test);

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
