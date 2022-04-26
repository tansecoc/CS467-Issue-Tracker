var router = module.exports = require('express').Router();

router.use('/test_endpoint', require('./test_endpoint'))