const Quiz = require('../models/quiz_model');

module.exports = {
    create(req, res, next) {
        const quizInfo = req.body
        Quiz.create(quizInfo)
            .then(quiz => res.send(quiz))
            .catch(next);
    },

    addQuestion(req, res, next) {
        const questionInfo = req.body
        Quiz.findOne({title: req.params.quizId}).then((quiz) => {
            quiz.questions.push(questionInfo);
            quiz.save()
                .then((quiz) => {
                    res.send(quiz);
                })
                .catch(next);
        })
    }
}
