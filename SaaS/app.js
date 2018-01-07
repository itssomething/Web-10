const express = require('express');
const config = require('./config.json');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const askRouter = require('./router/askRouter');
const questionRouter = require('./router/questionRouter');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

app.get('/', (req, res)=>{
    res.render("index", {
        html: "<h1>Hello</h1>"
    });
});

app.get('/about', (req, res)=>{
    res.render("about");
});

app.use('/ask', askRouter);
app.use('/question', questionRouter);

app.use(express.static('public'));

app.listen(config.port, (err) => {
    if (err) { console.log(err); };
    console.log(`App is listening at port ${config.port}`);
});