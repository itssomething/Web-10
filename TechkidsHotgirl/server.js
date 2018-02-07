const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

let app = express();

const imageApi = require('./routers/imagesApiRouter');
const userApi = require('./routers/usersApiRouter');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", handlebars({ defaultLayout: 'main' }));
app.set("view engine", "handlebars");

app.get('/', (req, res)=>{
  res.render('home', {
    isLogin: false
  });
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
    if(err) console.log(err);
    console.log('Server is up at port 6969');
})