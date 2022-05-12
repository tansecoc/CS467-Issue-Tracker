// const bcrypt = require('bcrypt');
// const passport = require('passport')
// const LocalStrategy = require('passport-local');
// const server = require('./server.js');


module.exports = function(passport, LocalStrategy, server, bcrypt){

    passport.use(new LocalStrategy(function verify(email, password, cb) {
        loginAttempt();
        async function loginAttempt(){
            const pool = server.createPool();
            try{
                let results = await JSON.stringify(pool.select().from('users').where('user_email', email), function(error, result){
                    if(error){
                        return cb(error)
                    }
                    if(result[0] === null || result[0] === undefined){
                        return cb(null, false, {msg: 'Incorrect username or password'})
                    } else{
                        bcrypt.compare(password, result[0].user_password_hash, function(error, check) {
                            if(error){
                                return cb(error)
                            } else if(check){
                                return cb(null, result[0])
                            } else{
                                return cb(null, false, {msg: 'Incorrect username or password'})
                            }
                        })
                    }
                })
            } catch(error){
                throw(error)
            }
        }
    }))
        
    
    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });
    
    passport.deserializeUser(function(user, cb) {
        cb(null, user);
    });
};