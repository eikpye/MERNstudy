
/*const p = Promise.resolve({id: 1});
p.then(userId => console.log('resolved'))
.catch(err => console.log('error'));*/

promise2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve({id: 1});
    }, 2000);
})
promise3 = new Promise((resolve) => {
    setTimeout(() => {
        resolve({id: 2});
    }, 5000);
})
Promise.race([promise2, promise3])
    .then(result => console.log(result));
Promise.all([promise2, promise3])
    .then(result => console.log(result))
    .catch(error => console.log('error'));

//reject makes entire Promise.all result in a reject
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

async function run(){
    //removeCourse('Daddy Bob');
    //const courses = await createCourse();
    //console.log(courses);
    //const courses = await getCourses();
    //console.log(courses);
    // const updateResult = await updateCourse();
    //console.log(updateResult);
    //const result = await updateCourse(1);
    //console.log(result);
}