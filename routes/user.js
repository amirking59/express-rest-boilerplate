const express = require('express');
const debug = require('debug')('user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const router = express.Router();

const db = require('../models');
const validator = require('../middlewares/validator.middleware');

/**
 * @api {post} /v1/user/register Register a user
 * @apiDescription Register a user
 * @apiVersion 1.0.0
 * @apiName RegisterUser
 * @apiGroup User
 *
 * @apiParam  {String}             [username]       User's username
 * @apiParam  {String}             [email]          User's email
 * @apiParam  {String}             [password]       User's password
 *
 * @apiSuccess {Object[]}   Create    create a user.
 *
 * @apiError (BadRequest 400)   BadRequest    Wrong information entered
 */
router.post('/register', validator('userRegister'), async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.User.create({
            username,
            password: hashedPassword,
            email,
        });

        return res.status(201).json({
            errors: [],
            msg: 'user created successfully',
        });
    } catch (err) {
        debug(err);
    }
});

/**
 * @api {post} /v1/user/login login a user
 * @apiDescription Login a user
 * @apiVersion 1.0.0
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam  {String}             [username]       User's username
 * @apiParam  {String}             [password]       User's password
 *
 * @apiSuccess {Object[]}   Create    login a user.
 *
 * @apiError (BadRequest 400)   BadRequest    Wrong information entered
 */
router.post('/login', validator('userLogin'), async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await db.User.findOne({
            where: {
                username,
            },
            raw: true,
        });

        if (!user) {
            return res.json({
                ok: false,
                errors: ['incorrect information'],
            });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.json({
                ok: false,
                errors: ['incorrect information'],
            });
        }

        const token = jwt.sign({
            user: _.omit(user, ['password']),
        }, 'TOP_SECRET');

        return res.json({
            ok: true,
            token,
            user: _.omit(user, ['password']),
        });
    } catch (err) {
        debug(err);
    }
});

module.exports = router;
