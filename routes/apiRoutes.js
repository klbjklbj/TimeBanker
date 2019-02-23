const db = require("../models");
const path = require("path");

module.exports = function (app) {
  // Get seed data from userdb and render it as json at url: /api/users.  This allows us to use jquery in order to make an ajax call and then render the data into html objects (like a bootstrap media object)
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/userupdate/:id", function (req, res) {
    db.User.findAll({
      where: {
        id: req.body.id
      }
    }).then(function (response) {
      res.json(response)
    })
  })

  app.put("/api/userupdate", function (req, res) {

    let newCredit = req.body.personHours
    console.log(newCredit);

    db.User.update({ personHours: newCredit },
      {
        where: {
          id: req.body.id,
        }
      }).then(function (response) {
        // console.log(`updated person hours now: ${res.params.personHours}`);
        res.json(response)
      });

  });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // User Login
  // app.post("/api/examples", function (req, res) {
  //   db.Example.create(req.body).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // Delete an example by id

  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });

};
