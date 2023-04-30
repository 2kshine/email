const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models/index");
const userRoutes = require("./routers/userRoutes");
const SessionMiddleware = require("./src/middlewares/sessionMiddleware");
const passport = require("./src/middlewares/passportMiddleware");
const redis = require("redis");
const RedisStore = require("connect-redis").default;
require("dotenv").config();

// Initialize express app
const app = express();

 //Redis configurations
 const redisClient = redis.createClient();
 try {
   //Connect redis client instance.
   redisClient.connect();
   console.log("Connected to redis successfully.");
 } catch (err) {
   console.log("Failed Connection." + err);
 }

//Initialize the store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: process.env.APP_NAME + ":",
  host: "127.0.0.1",
  port: 6379,
  ttl:5
});

//setup session middleware and passport middleware.
app.use(SessionMiddleware(redisStore));
app.use(passport.initialize());
app.use(passport.session());

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/api/v1/users", userRoutes);

//port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  sequelize.authenticate();
  console.log("Database connected!!");
  sequelize.sync();
  console.log("Database synced");
});
