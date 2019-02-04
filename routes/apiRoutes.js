var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
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

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
