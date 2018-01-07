const fileController = require('./fileController');
const dbPath = './db.json';

const getQuestionList = () => {
    let questionList = [];
    questionList = questionList.concat(fileController.readFileSync(dbPath));
    return questionList;
}

const addQuestion = (question) => {
    let questionList = getQuestionList();
    let newQuestion = {
        id: questionList.length,
        question: question,
        yes: 0,
        no: 0
    }
    questionList.push(newQuestion);
    fileController.writeFileSync(dbPath, questionList);
    return newQuestion.id;
}

const updateAnswerQuestion = (id, answer) => {
    let questionList = getQuestionList();
    if (answer === 'yes') {
        questionList[id].yes = questionList[id].yes + 1;
        fileController.writeFileSync(dbPath, questionList);
        return id;
    }
    else if (answer === 'no') {
        questionList[id].no = questionList[id].no + 1;
        fileController.writeFileSync(dbPath, questionList);
        return id;
    }
}

module.exports = {
    addQuestion,
    getQuestionList,
    updateAnswerQuestion
}