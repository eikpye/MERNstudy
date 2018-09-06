const courseSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 255}, //name validation
    //categories: {type: String, enum: ['good', 'bad', 'fantastic']},
    author: String,
    tags: {
        type: Array,
        validate:{
            isAsync: true,
            validator: function(value, callback){
                setTimeout(() => {
                    const result = v && v.length > 2
                }, 1000)
                callback(result);
                //return value && value.length > 2; // initial value checks for null
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
        name: 'Daddy Bob Course',
        author: 'Daddy Bob',
        tags: ['cleaner code', '1337', '1338'],
        price: 42
    });
    try{
        //await course.validate(); // mongoose doesn't return promise with error
        return await course.save();
    }
    catch(error){
        console.log(error.message);
    }
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
async function removeCourse(authorName){
    const result = await Course.deleteOne({author: authorName});
    console.log(result);
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

router.get('/', async (req, res) =>{
    const courses = await getCourses();
    res.send(courses);
});
router.get('/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        return res.status(404).send('404 not found');
    else
        res.send(course);
});

router.post('/', (req, res) =>{
    const result = validateCourse(req.body);
    if(!result)
        return res.status(400).send('400 error.');
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        return res.status(404).send('404 not found');
    const result = validateCourse(req.body);
    if(!result)
        return res.status(400).send('400 error');
    course.name = req.body.name;
    res.send(course);
})

router.delete('/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        return res.status(404).send('404 not found');
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})
function validateCourse(course)
{
    return true;
}

module.exports = router;