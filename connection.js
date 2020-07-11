const mysql = require("mysql");
const util = require("util")

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "employee_tracker_db"
  });

  connection.connect();

  connection.dbQuery = util.promisify(connection.query).bind(connection)

  module.exports = connection;