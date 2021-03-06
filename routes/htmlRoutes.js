// this is how we refer to our database models such as User
const db = require("../models");

// This allows express to load files and render web pages?
const path = require("path");

module.exports = function (app) {

  app.get('/', function (req, res) {
    //res.send('Welcome to TimeBanker');
    //res.render('index');
    res.sendFile(path.join(__dirname, "../public", "/html/index.html"));
  });

  app.get('/signup', (req, res) => {
    res.render('signup');
  });

  app.get('/signin', (req, res) => {
    res.render('signin');
  });

  // app.get('/dashboard', (req, res) => {
  //   // res.render('dashboard');
  //   res.sendFile(path.join(__dirname, "../public", "/html/available_services.html"));
  // });

  app.get('/signup', (req, res) => {
    res.render('signup');
  });

  app.get('/signin', (req, res) => {
    res.render('signin');
  });

  app.get('/dashboard', (req, res) => {
    res.render('dashboard');
  });

  app.get('/logout', (req, res) => {
    res.render('logout');
  });

  // Nate sending his media object html to the browser on the route /timeBank
  app.get('/timeBank', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "/html/available_services.html"));
  });

  // Nate sending his media object html to the browser on the route /timeBank
  app.get('/howitworks', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "/html/howitworks.html"));
  });

  // TODO: Nate needs to know what this does: Loading the available_services.html
  app.get("/timeBank", function (req, res) {
    db.User.findAll({}).then(function (dbUser) {
      res.sendFile("available_services", {
        msg: "Welcome!",
        users: dbUser
      });
    });
  });

  // Load index page
  // app.get("/", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // Load example page and pass in an example by id
  app.get("/userupdate/:id", function (req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function (
      dbUser
    ) {
      res.render("example", {
        users: dbUser
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    //res.send("thing!")
    res.render("404");
  });
};
