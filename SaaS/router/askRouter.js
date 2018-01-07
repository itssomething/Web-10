const express = require('express');
const Router = express.Router();
const questionController = require('../controller/questionController');

Router.get('/', (req, res)=>{
    console.log(req.query.question);
    res.render("ask");
});

Router.post('/', (req, res)=>{
    let id = questionController.addQuestion(req.body.question);
    if (id) {
        res.redirect(`/question/${id}`);
    } else {
        console.log("Error");
    }
});

module.exports = Router;