const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const session = require('express-session');
const cookies = require('cookie-parser');
const jwt = require('jsonwebtoken');
const configs = require('./configs.json');

let app = express();

const imageApi = require('./routers/imagesApiRouter');
const userApi = require('./routers/usersApiRouter');
const auth = require('./controllers/authController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookies());
app.use(session({
  secret: "webgen10",
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

app.engine("handlebars", handlebars({ defaultLayout: 'main' }));
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
  let token = req.session.token || req.cookies.token;
  if (token) {
    let data = jwt.verify(token, configs.secret_key);
    res.render('home', {
      isLogin: true,
      username: data.username
    });
  } else {
    res.render('home', {
      isLogin: false,
      username: null
    });
  }
});

app.post('/login', (req, res) => {
  auth.checkLogin(req.body, (err, username) => {
    if (err) {
      console.log(err.message || err);
    } else {
      if (!req.body.remember) {
        let token = jwt.sign({ username: username }, configs.secret_key);
        req.session.token = token;
        res.redirect('/');
      } else {
        let token = jwt.sign({ username: username }, configs.secret_key);
        res.cookie("token", token, { maxAge: 90000000 });
        res.redirect('/');
      }
    }
  })
});

app.get('/logout', (req, res) => {
  if (req.session.token) {
    req.session.destroy();
    res.redirect('/');
  }
  else if (req.cookies.token) {
    res.clearCookie("token");
    res.redirect('/');
  } else {
    res.redirect('/');
  }
})

app.use('/api/image', imageApi);
app.use('/api/user', userApi);

app.use(express.static("public"));

mongoose.connect(
  'mongodb://localhost:27017/hotgirl',
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database connect success!");
    }
  }
);

app.listen(6969, (err) => {
  if (err) console.log(err);
  console.log('Server is up at port 6969');
});

