const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
let pool = require('../config/database');

//////////////////////// Routes ////////////////////////////////////////
router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1>');
});

router.get('/login', (req, res, next) => {
    const form = '<h1>Login Page</h1><form method="POST" action="login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
});

router.post('/login', passport.authenticate('local', { failureRedirect: 'login-failure', successRedirect: 'login-success' }), (err, req, res, next) => {
    if (err) next(err);
});

router.get('/register', (req, res, next) => {
    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Email:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
});

router.post('/register', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hash){
        pool('users').insert(
            {user_first_name: 'K', user_last_name: 'P', org_id: '1', user_email: req.body.username, user_password_hash: hash}
        ).then()
    })
    res.redirect('login');
});

router.get('/protected-route', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.send('<h1>You are authenticated</h1>');
    } else {
        res.send('<h1>You are not authenticated</h1>');
    }
});

router.get('/logout', (req, res, next) => {
    res.clearCookie('user_id');
    res.clearCookie('org_id');
    req.logout();
    res.redirect('login');
});

router.get('/login-success', (req, res, next) => {
    res.cookie('user_id', req.user.user_id, {maxAge: 30 * 24 * 60 * 60 * 1000})
    res.cookie('org_id', req.user.org_id, {maxAge: 30 * 24 * 60 * 60 * 1000})
    res.send('You successfully logged in.');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong login info.');
});

module.exports = router;
