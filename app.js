const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Routes
const index = require('./routes/index');
const tasks = require('./routes/tasks');
const lists = require('./routes/lists');

const app = express();
const connection = require('./config/db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --------------------- ROUTING --------------------- //

// ---- Subtasks Routes / Controller ---- //
// /boards/:boardId/tasks/:taskId/subtasks
require('./routes/subtasks')(app);

// ---- Tasks Routes / Controller ---- //
// /boards/:boardId/tasks/
app.use('/boards/:boardId/tasks', tasks);

app.use('/', index);

app.use('/:id', lists);

// --------------------- END ROUTING --------------------- //

// catch 404 and forward to error handler
app.use(function(req, res, next) {
 res.status(404).json({message: '404: Not found', status: 404});
});

module.exports = app;
