const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    problem: {
        type: Number,
        required: [true, 'Questions must include a problem']
    },
    answers: [String]
})

module.export = QuestionSchema;