require("dotenv").config();
const config = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "timezone": 'Australia/Sydney',
    "dialect": "mysql",
    "migrationPath": "./src/migrations"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_TEST,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "timezone": 'Australia/Sydney',
    "migrationPath": "./src/migrations"

  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "timezone": 'Australia/Sydney',
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

module.exports = config;
