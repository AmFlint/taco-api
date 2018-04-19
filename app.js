const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
// -- Init Database Connection -- //
require('./config/db');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// --------------------- ROUTING --------------------- //
require('./routes/index')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
 res.status(404).json({message: '404: Not found', status: 404});
});

module.exports = app;
