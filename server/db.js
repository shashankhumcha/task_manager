const mysql = require('mysql2');
const MYSQL_URL='mysql://root:lTuOnENVbEVYxJlKfOKIgMOgfRCUXtsd@mysql.railway.internal:3306/railway'
const connection = mysql.createConnection({
  MYSQL_URL
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
