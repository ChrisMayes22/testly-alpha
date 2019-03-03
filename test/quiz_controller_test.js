const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

const Quiz = mongoose.model('quiz');

describe('Users Controller', () => {
    it('When valid POST is made to /api/quizzes, a new quiz is created', (done) => {
        request(app)
            .post('/api/quizzes')
            .expect(200)
            .send({
                "title":"71G",
                "timer": "60",
                "questions": [{
                    problem: "21%71G%M", 
                    answers: [{A: "7", B: "8", C: "9", D: "10", E: "11"}]}]
            })
            .then(() => {
                Quiz.findOne({title: '71G'})
                    .then((quiz) => {
                        expect(quiz.title).to.equal('71G');
                        expect(quiz.timer).to.equal('60');
                        expect(quiz.questions[0].answers.length).to.equal(1);
                        done();
                    })
                    .catch((err)=>{
                        console.log('ERR ', err);
                    })
            })
            .catch((err)=>{
                console.log('ERR ', err);
            })
    });
    it('When valid PATCH is made to /api/process_add-question, a new quiz question is created', (done) => {
        request(app)
            .patch('/api/process_add-question/71G')
            .expect(200)
            .send({
                    problem: "22%71G%M", 
                    answers: [{A: "21^3", B: "8", C: "9", D: "10", E: "11"}]
            })
            .then(() => {
                Quiz.findOne({title: '71G'})
                    .then((quiz) => {
                        const target = quiz.questions.find(char => char.problem === "22%71G%M");
                        console.log('QUIZ', quiz);
                        console.log('TARGET', target);
                        expect(target.answers[0].A).to.equal('21^3');
                        done();
                    })
                    .catch((err)=>{
                        console.log('ERR ', err);
                    })
            })
            .catch((err)=>{
                console.log('ERR ', err);
            })
    });
    it('When an invalid POST is made to /api/quizzes, an error message is sent', (done) => {
        request(app)
            .post('/api/quizzes')
            .send({})
            .expect(422)
            .then((res) => {
                expect(res.body).to.deep.include({error: 'quiz validation failed: title: Quizzes must have a title.'});
                done();
            })
            .catch(err => console.log('ERROR: ', err));
    });
})