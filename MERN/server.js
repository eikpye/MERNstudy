const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const courses = require('./routes/courses');
const home = require('./routes/home');

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api/courses', courses);
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

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    price: Number
});
const Course = mongoose.model('course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Uncle Bob Course',
        author: 'Uncle Bob',
        tags: ['clean code', '1337'],
        price: 42
    });
    const result = await course.save();
    console.log(result);
}
async function getCourses(){
    const course = await Course.find().where({author: 'Mosh'});
    if(!course) return 'error not found';
    return course;
}
async function updateCourse(id){
    const course = await Course.findById(id);
    if(!course) {
        console.log('course not found. no update was done.');
        return;
    }
    course.price = course.price / 2;
    const result = await course.save();
    return result;
}
/*async function updateCourse(id){
    const result = await Course.update({_id: id}, { // straightaway updates without returning course
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    })
    const result = await Course.findByIdAndUpdate(id, { // gets the course object // result is before update
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    }, {new: true }) // result becomes after update
    console.log(result);
}*/
async function run(){
    const courses = await getCourses();
    console.log(courses);
    // const updateResult = await updateCourse();
    //console.log(updateResult);
    //const result = await updateCourse(1);
    //console.log(result);
}
run();
/*
.find({price: {$gte: 10, $lte: 20}}) // greater than 10, less than 20
*/
/*const getUserPromise = getUser(1);
getUserPromise
    .then(user => getRepositories(user.username))
    .then(repoList => console.log(repoList))
    .catch(err => console.log('Error.', err.message));
*/
async function showRepos()
{
    try{
    const user = await getUser(1);
    const repos = await getRepositories(user.username);
    console.log(repos);
    }
    catch (err){
        console.log(err);
    }
}

function getUser(id)
{
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log('Getting user from database.');
            resolve({id: id, username: 'mosh'});
        }, 2000);
    })
}
function getRepositories(username)
{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting repositories from database.');
            resolve(['repo1', 'repo2']);
        }, 2000);
    })
}

/*const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve(1);
        reject(new Error('message'));
    }, 2000);
})
p.then(result => console.log('Result ', result)).catch(err => console.log('Error', err.message));*/

const dynamicPort = process.env.Port || 8000;
app.listen(dynamicPort, () => console.log(`Server Listening on port ${dynamicPort}.`));