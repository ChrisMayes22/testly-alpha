const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/testly_test', { useNewUrlParser: true});

mongoose.connection
    .once('open', () => done())
    .on('Error', (error) => {
        console.warn('Warning', error)
    });
})

beforeEach(function(done){
    const { users } = mongoose.connection.collections;
    users.drop()
        .then(() => {
            const { quizzes } = mongoose.connection.collections;
            quizzes.drop();
            done();
        })
        .catch(() => done());
})