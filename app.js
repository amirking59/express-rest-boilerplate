const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');
require('./config/passport');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(compression());
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/v1/user', userRouter);

app.use((req, res) => res.status(404).json({
    errors: ['not found'],
    msg: '',
}));

module.exports = app;
