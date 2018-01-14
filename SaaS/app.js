const express = require('express');
const config = require('./config.json');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const askRouter = require('./router/askRouter');
const questionRouter = require('./router/questionRouter');

const questionController = require('./controller/questionController');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

app.get('/', (req, res)=>{
    questionController.getRandomQuestion((err, data)=>{
        if (err) console.log(err);
        if (data._id) {
            res.render('question', {
                question: data,
                isAsk: "",
                isQuestion: "active"
            });
        } else {
            res.render('question', {
                question: null,
                isAsk: "",
                isQuestion: "active"
            });
        }
    });
});

app.get('/about', (req, res)=>{
    res.render("about");
});

app.use('/ask', askRouter);
app.use('/question', questionRouter);

app.use(express.static('public'));

mongoose.connect(config.connectionString, (err)=>{
    if(err){
        console.log(err);
    } else {
        console.log("Database connect success!");
    }
})

app.listen(config.port, (err) => {
    if (err) { console.log(err); };
    console.log(`App is listening at port ${config.port}`);
});