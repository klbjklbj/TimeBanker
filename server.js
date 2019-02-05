// dotenv allows for sensitive information to be stored securely
require("dotenv").config();
// express is a javascript library for implementing servers in Node
var express = require("express");

// handlebars is a templating engine
// var exphbs = require("express-handlebars");

// setting a variable names app to hold the function express()
var app = express();

// This sets up the port so that it can be assigned by Heroku or listen on port8080 by default
var PORT = process.env.PORT || 8080;


var bodyParser = require("body-parser");
var request = require("request");

// this is for sequilize.  Sequilize will then syn our models with the database i.e. create our schemas and seeds
var db = require("./models");



// Middleware so that express will handle data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// this sets up express to be able to use files from a directory that the client downloads to use with the app.  These are known as "static" directories.
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Sending HTML file to browser
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});

app.post("/subscribe", (req, res) => {

  // if it's blank or null means user has not selected the captcha, so return the error.
  if (req.body.captcha === undefined ||
    req.body.captcha === "" ||
    req.body.captcha === null
  ) {
    return res.json({ "success": false, "msg": "Please select captcha" });
  }

  var secretKey = "6LckmY4UAAAAAKtNn0LpIu1mbA0sPr6MlwLWj3Y3";

  // req.connection.remoteAddress will provide IP address of connected user.
  var verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  //Make request to verifyUrl
  request(verifyUrl, (err, response, body)=> {
    body = JSON.parse(body);
    //if not successful
    if (body.success !== undefined && !body.success) {
      return res.json({ "success": false, "msg": "Failed captcha" });
    }
    //if successful code goes below...

    //This is where we send data to db
    

    return res.json({ "success": true, "msg": "Successful captcha" });

    
  });
});

// Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// TODO:This has something to do with resetting the database during testing?  See code below...
var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Sequelize is taking our models files and rendering the data as directed by the code in those files (user.js) instead of us building the code in mysql, THEN once the schema has been run and the table created based on the definitions in the models folder, we are adding in some seed data to the User table.  THEN, once the seeds have been planted into the schema: start the server listening (for get and post requests from the localhost.) ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  db.User.create({
    firstName: 'Leonard',
    lastName: 'Nimoy',
    skill: 'Logic and Mind Melding',
    email: 'spock@vulcan.com',
    image: 'https://66.media.tumblr.com/c8945ee30829cb081e4c2eeaca115b16/tumblr_plxye0xXPy1w314t0o1_540.png'
  });
  db.User.create({
    firstName: 'William',
    lastName: 'Shatner',
    skill: 'Captain',
    email: 'kirk@enterprise.com',
    image: 'https://www.gettyimages.com/detail/news-photo/canadian-actor-william-shatner-as-captain-james-t-kirk-in-news-photo/81792246'
  });

}).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
