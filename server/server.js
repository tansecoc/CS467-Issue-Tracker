'use strict';

const process = require('process');
const express = require('express');
const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);
const knexSession = require('connect-session-knex')(session);
const passport = require('passport');
const pool = require('./config/database');
require('./config/passport')
// require('dotenv').config();                     // for injecting local environment
const path = require('path');

const app = express();
app.enable('trust proxy');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "client", "build")));

// Set Content-Type for all responses for these routes.
// Session Setup for Knex
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 10 * 24 * 60 * 60 * 1000},  // 10 days
  store: new knexSession({
      knex: pool,
      createTable: true
  })
}));


// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Routes for the API endpoints
const testRoute = require('./routes/testRoute');
const orgs = require('./routes/orgs');
const users = require('./routes/users');
const projects = require('./routes/projects');
const issues = require('./routes/issues');

app.use('/api/testRoute', testRoute);
app.use('/api/orgs', orgs);
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/issues', issues);
app.use('/test', require('./routes/test'));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Start server
const PORT = parseInt(process.env.PORT) || 8080;
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
