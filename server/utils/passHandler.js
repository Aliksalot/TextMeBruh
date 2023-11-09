const bcrypt = require('bcrypt')

const passwordStatus = {
    short: "SHORT",
    bad: "BAD",
    not_match: "WRONG",
    ok: "OK"
}

const encryptPassword = (plainPassword, callback) => {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return callback(err);

        bcrypt.hash(plainPassword, salt, (err, hashedPassword) => {
            if (err) return callback(err);

            callback(null, hashedPassword);
        });
    });
}

const comparePasswords = async(passwordAttempt, hashedPassword) => {
    return new Promise(async(resolve, reject) => {
        bcrypt.compare(passwordAttempt, hashedPassword, (err, result) => {
            resolve(result)
        })
    })
}

const passwordState = (password, password_repeat) => {
    if(password !== password_repeat){
        return  passwordStatus.not_match
    }

    if(password.length < 4){        
        return  passwordStatus.short
    }

    const isPassBad = () =>{
        const regex = /^(?!.*password).+$/
        return !regex.test(password)
    }

    if(isPassBad(password)){        
        return  passwordStatus.bad
    }

    return passwordStatus.ok
}

module.exports = {
    comparePasswords,
    encryptPassword,
    passwordState,
    passwordStatus
}