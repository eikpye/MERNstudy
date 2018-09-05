
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