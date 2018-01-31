const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let app = express();

const imageApi = require('./routers/imagesApiRouter');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/image', imageApi);

mongoose.connect(
    'mongodb://localhost:27017/hotgirl',
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

app.listen(6969, (err) => {
    if(err) console.log(err);
    console.log('Server is up at port 6969');
})