const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./database');
const passwordUtils = require('../lib/passwordUtils');

//TODO
passport.use(new LocalStrategy(function(username, password, cb) {
    try{
        pool.select().from('users').where('user_email', username)
        .then((results) => {
            let user = results[0];
            if (typeof user == null || typeof user == undefined){
                return cb(null, false)
            }    
            // Validates hash password
            passwordUtils.validPassword(password, user.user_password_hash)
            .then(isValid => {
                if (isValid) {
                    return cb(null, user);
                } else {
                    return cb(null, false);
                }
            })
        })
        .catch((err) => {   
            cb(err);
        })
    } catch(err){
        throw(err)
    }
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.user_id);
});

passport.deserializeUser(function(user_id, cb) {
    pool.select().from('users').where('user_id', user_id)
    .then(results =>{
        let user = results[0];
        cb(null, user)
    })
    .catch((err) =>{
        return cb(null, err)
    })
});