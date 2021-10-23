const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const sqlSession = require('express-mysql-session')(session);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(compression());
app.use(session({
    secret: 'session_cookie_secret',
    // eslint-disable-next-line new-cap
    store: new sqlSession({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '32919003aA',
        database: 'test',
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
    logErrors: true,
}));
app.use((req, res, next) => {
    req.session.init = 'init';
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
