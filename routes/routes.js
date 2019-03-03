const UsersController = require('../controllers/user_controller');
const QuizController = require('../controllers/quiz_controller');

module.exports = (app) => {
    app.post('/api/users', UsersController.create);
    app.post('/api/quizzes', QuizController.create);

    app.patch('/api/process_add-question/:quizId', QuizController.addQuestion)
}