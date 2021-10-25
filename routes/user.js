const express = require('express');
const debug = require('debug')('user');
const bcrypt = require('bcrypt');

const router = express.Router();

const db = require('../models');
const validator = require('../middlewares/validator.middleware');

/**
 * @api {post} /v1/user Register a user
 * @apiDescription Register a user
 * @apiVersion 1.0.0
 * @apiName RegisterUser
 * @apiGroup User
 *
 * @apiParam  {String}             [username]       User's name
 * @apiParam  {String}             [email]          User's email
 * @apiParam  {String}             [password]       User's password
 *
 * @apiSuccess {Object[]}   Create    create a user.
 *
 * @apiError (BadRequest 400)   BadRequest    Wrong information entered
 */
router.post('/', validator('userRegister'), async (req, res, next) => {
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

module.exports = router;
