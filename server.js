// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Set Handlebars.
var exphbs = require("express-handlebars");

// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3000;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

var server = require("http").createServer(app);

 var io = require("socket.io").listen(server);

 users = [];
 connections = [];

 server.listen(process.env.PORT || 8080)


 io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);

  //DISCONNECT
  socket.on('disconnect', function(data){
      users.splice(users.indexOf(socket.username), 1);
      updateUsernames();
      connections.splice(connections.indexOf(socket), 1);
      console.log("Disconnected: %s sockets connected", connections.length);
  });
  //SEND MESSAGE
  socket.on('send message', function(data){
      io.sockets.emit("new message", {msg: data, user: socket.username});
  });
  //NEW USER
  socket.on("new user", function(data, callback){
      callback(true);
      socket.username = data;
      users.push(socket.username);
      updateUsernames();
  });
  function updateUsernames(){
      io.sockets.emit("get users". users);
  }
});
