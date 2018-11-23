// Requiring our models and passport as we've configured it
var db = require("../models");
var moment = require('moment');
var passport = require("../config/passport");
const yelp = require('yelp-fusion'); 
const apiKey = "9hCKvwaQl2sNmHInxGKzbzpZXCtOfxvtrxLPXfKhVfc9UZhIseffJZx586xlfpFgxMX31QwMbAkLp74ryzcxpUu5_-G8GvZbAeemncmHyrg4npAhSBGgqZU-IH_zW3Yx"
const client = yelp.client(apiKey);

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/mainPage");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/yelp1/:location", function(req, res){

    var yelpLocation = req.params.location

    client.search({
      term:'nightlife',
      location: yelpLocation,
      limit:3
    }).then(response => {
      res.json(response);
    }).catch(e => {
      console.log(e);
    })
  
  })

  app.get("/api/yelp2/:location", function(req, res){

    var yelpLocation = req.params.location

    client.search({
      term:'restaurant',
      location: yelpLocation,
      limit:3
    }).then(response => {
      res.json(response);
    }).catch(e => {
      console.log(e);
    })
  
  })

  app.get("/api/yelp3/:location", function(req, res){

    var yelpLocation = req.params.location

    client.search({
      term:'mall',
      location: yelpLocation,
      limit:3
    }).then(response => {
      res.json(response);
    }).catch(e => {
      console.log(e);
    })
  
  })



  
  
  
    app.get("/search/:city/:state/:start/:end", function(req, res) {

      var cityLocation = req.params.city;
      var stateLocation = req.params.state;

      var startDate = req.params.start;
     
      
      var endDate = req.params.end;


      var momStart = moment("'" + startDate + "'").format("YYYY-MM-DD")
      
      
      var momEnd = moment("'" + endDate + "'").format("YYYY-MM-DD")
 


      db.Listing.findAll({

        where : {City : cityLocation,
                Taken: false,
                State : stateLocation,
                StartDate: {
                  $lte: momStart
                },

                EndDate: {
                  $gte : momEnd
                }
              }

        }).then(function(searchRes) {
          res.json(searchRes);
      })

    });

    // app.get("/api/listings/", function(req, res) {

    //   var listingUser = req.params.user

    //   db.Listing.findAll({

    // }).then(function(userListing) {
    //       res.json(userListing);
    //   })

    // })

    app.get("/api/listing/:id", function (req, res){

      db.Listing.findOne({
        where:{ 
          id: req.params.id
        }
       
      }).then(function(moreInfo){

        console.log(listId)
        res.json(moreInfo)
      
      })



    })


    
  

  app.post("/api/listings", function(req, res){

    let data = {...req.body};

    data.UserId = req.user.id;
  
    db.Listing.create(data).then(function(dbListing) {
      res.json(dbListing);
  })
  
  })

  app.post("/api/:listingID/ratings", function(req, res){

    let data1 = {...req.body};
    data1.ListingId = req.params.listingID

    console.log(data1)


    db.Rating.create(data1).then(function(dbRating) {
      res.json(dbRating);
  })
  
  })



   
  app.put("/api/listings", function(req, res) {
    db.Listing.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbListing) {
      res.json(dbListing);
    });
  });




  // app.delete("/api/listings/:id", function(req, res) {
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });

  

}


