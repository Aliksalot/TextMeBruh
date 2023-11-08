const bcrypt = require('bcrypt')

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

module.exports = {
    comparePasswords,
    encryptPassword
}