require("dotenv").config();
var express = require("express");
// var exphbs = require("express-handlebars");

var bodyParser = require("body-parser");
var request = require("request");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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

  //Make request to verifyUrl for reCaptcha
  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);
    //if not successful
    if (body.success !== undefined && !body.success) {
      return res.json({ "success": false, "msg": "Failed captcha" });
    }
    //if successful code goes below...

    // **********THIS IS WHERE WE SEND DATA TO DATABASE*************


    // ***********WE ALSO NEED CODE to Reload the current document so new user can now login***************

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
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
