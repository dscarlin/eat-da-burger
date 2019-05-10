// Dependencies
var express = require("express");
var db = require('./models')

// Create an instance of the express app.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Import routes and give the server access to them.
require("./controllers/burgersController.js")(app);
// db.burgers.hasOne(db.customer)



db.sequelize.sync({force: true}).then(() => {
  app.listen(PORT, function() {
    console.log("Listening on port:%s", PORT);
  });
})
