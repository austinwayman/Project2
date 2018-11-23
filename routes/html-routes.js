// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
var moment = require('moment');


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/mainPage");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/mainPage");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/mainPage", isAuthenticated, function (req, res) {



    res.render("mainPage");
  });

  app.get("/listing/:id", isAuthenticated, function (req, res) {

    db.Listing.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (moreInfo) {

      res.render("listing", { listings: moreInfo })

    })

  });

  app.get("/userlistings/:user", function (req, res) {


    db.Listing.findAll({
      where: {
        UserId:  req.params.user
      }

    }).then(function (data) {



      res.render("userlistings", { listingUser : data})



    })


  })




}

