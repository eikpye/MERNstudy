const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const courses = require('./routes/courses');
const home = require('./routes/home');

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/courses', courses);
app.use('/', home);

const dbConfig = require('./config/keys').mongoURI;

/*if(app.get('env') === 'development'){
    console.log('Env is development.');
}*/
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

mongoose.connect(dbConfig, (err) =>{
    if(err)
        console.log(err);
    else
        console.log('MongoDB Connected.');
});

const dynamicPort = process.env.Port || 8000;
app.listen(dynamicPort, () => console.log(`Server Listening on port ${dynamicPort}.`));