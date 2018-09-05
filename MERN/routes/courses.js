const express = require('express');
const router = express.Router();
const courses = [
    {id: 1, name: 'food1'},
    {id: 2, name: 'food2'},
    {id: 3, name: 'food3'}
]


router.get('/', (req, res) =>{
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