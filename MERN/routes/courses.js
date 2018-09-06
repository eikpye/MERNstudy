const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 255}, //name validation
    //categories: {type: String, enum: ['good', 'bad', 'fantastic']},
    author: String,
    tags: {
        type: Array,
        validate:{
            isAsync: true,
            validator: function(value){
                return value && value.length > 2; // initial value checks for null
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: {type: Date, default: Date.now},
    price: {type: Number, required: function(){ return true}}
});

const Course = mongoose.model('course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Uncle Bob Course',
        author: 'Uncle Bob',
        tags: ['clean code', '1337', '1338'],
        price: 42
    });
    try{
        return await course.save();
    }
    catch(error){
        console.log(error.message);
    }
}
async function getCourses(){
    const courses = await Course.find();
    if(!courses) return 'We don\'t have any courses currently. Sorry!';
    return courses;
}
async function updateCourse(id){
    const course = await Course.findById(id);
    if(!course) {
        return 'You tried to update a non-existing course!';
    }
    course.price = course.price + 2;
    try{
        return await course.save();
    }
    catch(error){
        console.log('Course was not saved due to... errors.');
    }
}
async function removeCourse(id){
    try{
        return await Course.deleteOne({_id: id});
    }
    catch(error){
        console.log(error);
    }
}

router.get('/', async (req, res) =>{
    const courses = await getCourses();
    res.send(courses);
});
router.get('/:id', async (req, res) =>{
    const course = await Course.findById(req.params.id);
    if(!course)
        return res.status(404).send('The course you have searched for does not exist. Sorry!');
    else
        res.send(course);
});

router.post('/', async (req, res) =>{
    const result = await createCourse();
    res.send('Course created!' + result);
});

router.put('/:id', async (req, res) =>{
    const result = await updateCourse(req.params.id);
    res.send(result);
})

router.delete('/:id', async (req, res) =>{
    const result = await removeCourse(req.params.id);
    res.send(result);
})
function validateCourse(course)
{
    return true;
}

module.exports = router;