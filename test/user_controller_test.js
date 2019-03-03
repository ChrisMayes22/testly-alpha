const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

const User = mongoose.model('user');

describe('Users Controller', () => {
    it('When valid POST is made to /api/users, a new user is created', (done) => {
        request(app)
            .post('/api/users')
            .expect(200)
            .send({"username": "username"})
            .then((err, res) => {
                User.findOne({username: 'username'})
                    .then((user) => {
                        expect(user.username).to.equal('username');
                        done();
                    })
                    .catch((err) => console.log('ERROR: ', err));
            })
            .catch((err) => console.log('ERROR: ', err));
    });
    it('When an invalid POST is made to /api/users, an error message is sent', (done) => {
        request(app)
            .post('/api/users')
            .send({})
            .expect(422)
            .then((err, res) => {
                expect(err.body).to.deep.include({error: 'user validation failed: username: A username is required'});
                done();
            })
            .catch(err => console.log('ERROR: ', err));
    });
})