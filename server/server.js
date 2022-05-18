'use strict';

const process = require('process');
const express = require('express');
const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);
const knexSession = require('connect-session-knex')(session);
const passport = require('passport');
const pool = require('./config/database');

require('./config/passport')
require('dotenv').config();                     // for injecting local environment

const app = express();
app.enable('trust proxy');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Set Content-Type for all responses for these routes.
// app.use((req, res, next) => {
//   res.set('Content-Type', 'application/json');
//   next();
// });


// Session Setup for Knex
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 10 * 24 * 60 * 60 * 1000},  // 10 days
  // // PG Sesssion set up
  // store: new pgSession({
  //     pool: pool,
  //     tableName: 'user_sessions',
  //     createTableIfMissing: true
  // })
  store: new knexSession({
      knex: pool,
      tableName: 'user_sessions_knex',
      createTable: true
  })
}));


// Passport
app.use(passport.initialize());
app.use(passport.session());


// // Routes for the API endpoints
// const testRoute = require('./routes/testRoute');
// const orgs = require('./routes/orgs');
// const users = require('./routes/users');
// const projects = require('./routes/projects');
// const issues = require('./routes/issues');
const test = require('./routes/test');


// // Routes
// app.use('/testRoute', testRoute);
// app.use('/orgs', orgs);
// app.use('/users', users);
// app.use('/projects', projects);
// app.use('/issues', issues);
app.use('/', test)


// Start server
const PORT = parseInt(process.env.PORT) || 8080;
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});