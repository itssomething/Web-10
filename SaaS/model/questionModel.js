const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: { type: String, required: true },
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 }
});

module.exports = mongoose.model("question", QuestionSchema);