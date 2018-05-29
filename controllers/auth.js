const passport = require("../passport/passport");

const router = require("express").Router();

const db = require("../models");

router.get("/", (req, res) =>{
  db.User.findAll(req.query)
  .then(dbUser=> res.json(dbUser))
  .catch(err => console.log(err))
})

router.post("/signup", (req, res) => {
  db.User.create(req.body)
    .then((results) =>{
      res.json("/login");
    })
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  // console.log(req.user);
  res.json(req.user);
});

router.get('/logout', function(req, res){
  console.log("LOGOUT SUCCESS!");
  req.logout();

  
  res.redirect('/');
});

router.get("/getUser", (req, res) => {
  if(req.user){
    res.json(req.user );
  }else{
    res.json(null)
  }
});

module.exports = router;