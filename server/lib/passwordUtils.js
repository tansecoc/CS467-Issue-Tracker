var bcrypt = require('bcrypt');

function validPassword(password, hash){
    return bcrypt.compare(password, hash)
    .then(result => {
        return result;
    })
    .catch((err) =>{
        throw err
    })
}

module.exports.validPassword = validPassword;