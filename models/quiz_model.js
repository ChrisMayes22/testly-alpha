const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = require('./question_schema');

const QuizSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Quizzes must have a title.']
    },
    timer: String,
    questions: [QuestionSchema]
})

const Quiz = mongoose.model('quiz', QuizSchema);

module.exports = Quiz;