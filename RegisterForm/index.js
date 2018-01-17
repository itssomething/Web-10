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

app.post("/", async (req, res) => {
  try {
    const username = await userController.tryCreateUser(req.body);
    res.send(`Welcome, ${username}!`);
  }
  catch (error) {
    res.render("register", {
      email: req.body.email,
      username: req.body.username,
      error
    });
  }
});

app.get("/check-username/:username", (req, res) => {
  userController.getQuestionByUsername(req.params.username)
    .then(user => {
      res.send({ success: true, found: !!user });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
});

app.get("/check-email/:email", (req, res) => {
  userController.getQuestionByEmail(req.params.email)
    .then(user => {
      res.send({ success: true, found: !!user });
    })
    .catch(err => {
      res.send({ success: false, err });
    });
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