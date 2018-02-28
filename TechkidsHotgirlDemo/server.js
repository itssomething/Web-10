const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const session = require('express-session');

let app = express();

const imageApi = require('./routers/imagesApiRouter');
const userApi = require('./routers/userApiRouter');
const auth = require('./controllers/authController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'webgen10',
  cookie: {}
}))

app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

app.get('/', (req, res)=>{
  if(!req.session.username) {
    res.render('login');
  } else {
    res.render('home', {
      username: req.session.username
    });
  }
});

app.post('/login', (req, res)=>{
  if(req.body.username && req.body.password) {
    auth.login(req.body.username, req.body.password, (err, data) => {
      if(err && err.message) { res.send(err.message); }
      else if(err) { console.log(err) }
      else {
        req.session.username = data.username;
        res.redirect('/');
      }
    })
  } else {
    res.send('Username and password is required!');
  }
});

app.use('/api/image', imageApi);

app.use('/api/user', userApi);

app.use(express.static('public'));

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
    if(err) console.log(err);
    console.log('Server is up at port 6969');
})