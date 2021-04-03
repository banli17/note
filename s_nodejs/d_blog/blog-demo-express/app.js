var createError = require('http-errors');
const fs = require('fs')
var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session)
const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
    client: redisClient
})
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user')
var blogRouter = require('./routes/blog')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
if (process.env.NODE_ENV === 'div') {
    app.use(logger('dev'));
} else {
    app.use(logger('combined', {
        stream: fs.createWriteStream(path.join(__dirname, 'logs/access.log'), {
            flags: 'a'
        })
    }));
}
app.use(express.json());
app.use(session({
    secret: 'Hello',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
}))
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter)
app.use('/blog', blogRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
