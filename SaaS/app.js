const express = require('express');
const config = require('./config.json');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const fileController = require('./fileController');
const askRouter = require('./askRouter');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

app.get('/', (req, res)=>{
    res.render("index", {
        layout: "other",
        html: "<h1>Hello</h1>"
    });
});

app.get('/about', (req, res)=>{
    
});

app.use('/ask', askRouter);

app.use(express.static('public'));

app.listen(config.port, (err) => {
    if (err) { console.log(err); };
    console.log(`App is listening at port ${config.port}`);
});