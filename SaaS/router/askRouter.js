const express = require('express');
const Router = express.Router();
const questionController = require('../controller/questionController');

Router.get('/', (req, res)=>{
    res.render("ask", {
        isAsk: "active",
        isQuestion: ""
    });
});

Router.post('/', (req, res)=>{
    questionController.addQuestion(req.body.question, (err, id)=>{
        if (err) {
            console.log(err);
        } else {
            res.redirect(`/question/${id}`);
        }
    });
});

module.exports = Router;