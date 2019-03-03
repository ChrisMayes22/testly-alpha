const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const mongoose = require('mongoose');

console.log(`App is running! Environment is ${process.env.NODE_ENV}`);

app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}))

mongoose.Promise = global.Promise;
if(process.env.NODE_ENV !== 'test'){
    mongoose.connect('mongodb://localhost/testly', { useNewUrlParser: true});
}

routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message })
})

app.listen(3050);

module.exports = app;