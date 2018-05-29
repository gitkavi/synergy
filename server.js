const express = require("express");
const path = require("./routes");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan")("tiny");

const {auth} = require("./controllers");

// Requiring our models for syncing
const db = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger);

//controllers
app.use("/auth", auth);

app.use(path);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  // app.use(express.static("client/build"));
  app.use(express.static(path.join(__dirname, '/client/build')));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });
});
