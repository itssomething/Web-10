const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const handlebars = require('express-handlebars');

const config = require('./config.json');
const userController = require('./controllers/userController');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("register");
});

app.post("/", (req, res) => {
  userController.validateAndAddUser(req.body)
    .then(result => res.send(`Welcome, ${req.body.username}!`))
    .catch(err => {
      res.render("register", {
        username: req.body.username,
        email: req.body.email,
        error: err
      })
    });

  // userController.validateAndAddUser(req.body, (err, result) => {
  //   if(err) res.render("register", {
  //     username: req.body.username,
  //     email: req.body.email,
  //     error: err
  //   });
  //   else res.send(`Welcome, ${req.body.username}!`);
  // });
});

app.get('/api/check-username/:username', (req, res) => {
  userController.getUserByUsername(req.params.username)
  .then(user => {
    if(user){
      res.send({
        success: true,
        result : false
      })
    }
    else{
      res.send({
        success: true,
        result : true
      })
    }
  })
  .catch(err => {
    console.error(err);
    res.send({
      success: false
    });
  })
});

app.get('/api/check-email/:email', (req, res) => {
  userController.getUserByEmail(req.params.email)
  .then(user => {
    if(user){
      res.send({
        success: true,
        result : false
      })
    }
    else{
      res.send({
        success: true,
        result : true
      })
    }
  })
  .catch(err => {
    console.error(err);
    res.send({
      success: false
    });
  })
});

app.use(express.static('public'));

mongoose.connect(
  config.connectionString,
  {
    useMongoClient: true
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database connect success!");
    }
  }
);

app.listen(config.port, (err) => {
  if (err) { console.log(err); }
  console.log(`App is listening at port ${config.port}`);
});