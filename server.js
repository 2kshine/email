const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const { sequelize } = require('./models/index');
const userRoutes = require('./routers/userRoutes');
require("dotenv").config();

// Initialize express app
const app = express();

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/api/v1/users", userRoutes)
//port
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    sequelize.authenticate();
    console.log("Database connected!!")
    sequelize.sync({force:true});
    console.log('Database synced')
})
