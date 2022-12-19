const mysql = require("mysql");
const dbConfig = require("./config/db.config.js");

let connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  insecureAuth : true
});

module.exports = connection;