const bcrypt = require('bcrypt');
const saltRounds = 10;
const password= 'admin';

console.log("password : ", password);

bcrypt.genSalt(saltRounds).then(salt => {
    console.log("salt : ", salt);
    return bcrypt.hash(password, salt);
})
.then(hash => {
    console.log("hash : ", hash);
})
.catch(err => console.log(err.message));  



bcrypt
    .hash(password+"ress", saltRounds)
    .then(hash => {
        console.log("hash : ", hash);
        validateUsers(hash);
    })
    .catch(err => console.log(err.message));


function validateUsers(hash) {
    bcrypt.compare(password, hash).then(res => {
        console.log("password: ", password)
        console.log("res: ", res);
    })
    .catch(err => console.log(err.message));
}



