var router = module.exports = require('express').Router();

router.get('/', function (req, res) {
    res.send('this is the backend server');
  });

router.use('/test_endpoint', require('./test_endpoint'))