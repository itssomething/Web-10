const express = require('express');
const Router = express.Router();
const questionController = require('../controller/questionController');

// Get / -> getAll
// Get /:id -> getById
// Post / -> create
// Put / -> update
// Delete / -> delete

Router.post('/:id', (req, res) => {
  questionController.updateAnswerQuestion(req.params.id, req.body.answer, (err, id) => {
    if (err) console.log(err);
    if (id) {
      questionController.getQuestionById(id, (err, data) => {
        if (err) console.log(err);
        
        setTimeout(() => {
          res.render('questionVoteResult', {
            layout: false,
            total: data.yes + data.no,
            yes: (data.yes === 0 && data.no === 0) ? 50 : 100 * data.yes / (data.yes + data.no),
            no: (data.no === 0 && data.yes === 0) ? 50 : 100 * data.no / (data.yes + data.no),
          });
        }, 1000);
      });
    }
  });
});

module.exports = Router;