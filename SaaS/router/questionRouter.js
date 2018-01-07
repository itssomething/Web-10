const express = require('express');
const Router = express.Router();
const questionController = require('../controller/questionController');

Router.get('/', (req, res)=>{
    let questionList = questionController.getQuestionList();
    let randomQuestionId = Math.floor(Math.random()*questionList.length);
    res.render('question', {
        question: questionList[randomQuestionId]
    })
});

Router.get('/:id', (req, res)=>{
    let questionList = questionController.getQuestionList();
    res.render('questionDetail', {
        question: questionList[req.params.id]
    })
});

Router.post('/:id', (req, res)=>{
    let id = questionController.updateAnswerQuestion(req.params.id, req.body.answer);
    if (id) res.redirect(`/question/${id}`);
});

module.exports = Router;