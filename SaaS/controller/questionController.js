const QuestionSchema = require('../model/questionModel');

const getQuestionList = (callback) => {
    QuestionSchema.find({}, (err, res)=>{
        if(err) {
            callback(err);
        } else {
            callback(null, res._id);
        }
    });
}

const getRandomQuestion = (callback) => {
    QuestionSchema.find({}, (err, res)=>{
        if(err) {
            callback(err);
        } else {
            let questionList = res;
            let randomQuestionId = Math.floor(Math.random()*questionList.length);
            callback(null, questionList[randomQuestionId]);
        }
    });
}

const addQuestion = (question, callback) => {
    let newQuestion = {
        question
    };
    QuestionSchema.create(newQuestion, (err, res)=>{
        if(err) {
            callback(err);
        } else {
            callback(null, res._id);
        }
    });
}

const updateAnswerQuestion = (id, answer, callback) => {
    QuestionSchema.findById(id,(err, res)=>{
        if(err){
            callback(err);
        } else {
            let question = res;
            if (answer === 'yes') {
                question.yes = question.yes + 1;
                question.save(function (err) {
                    if (err) callback(err);
                    callback(null, question._id);
                });
            }
            else if (answer === 'no') {
                question.no = question.no + 1;
                question.save(function (err) {
                    if (err) callback(err);
                    callback(null, question._id);
                });
            }
        }
    })
}

const getQuestionById = (id, callback) => {
    QuestionSchema.findById(id,(err, res)=>{
        if(err){
            callback(err);
        } else {
            callback(null, res)
        }
    });
}

module.exports = {
    addQuestion,
    getQuestionList,
    updateAnswerQuestion,
    getQuestionById,
    getRandomQuestion
}