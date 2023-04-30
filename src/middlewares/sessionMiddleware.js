const session = require("express-session");
require("dotenv").config();

const uuid = require("uuid");

//Configure session middleware
const SessionMiddleware = (redisStore) => {
  
  return session({
    //session id to have UUID V4 capabilities
    genid: (req) => {
      return uuid.v4();
    },
    secret: process.env.SECRET,
    name: "_redisSession",
    resave: false, // Force session to store even if it isnt modified.
    //saveUninitialized false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie.
    saveUninitialized: false, // recommended: only save session when data exists
    store: redisStore,
    cookie: {
      secure: false, //Turn to true once you install TLS/SSL
      httpOnly: false, //Dont prevent client side JS to read the cookie
      maxAge: 60 * 60 * 24 * 15 * 1000
    },
  });
};

module.exports = SessionMiddleware;
