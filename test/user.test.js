const app = require('../app')
const db = require('../models')
const supertest = require('supertest')
const { expect } = require('chai')
const debug  = require('debug')('test')

before(async function (){
    await db.sequelize.sync({force: true})
})

describe('user api', function () {
    describe('POST v1/user/register', function () {
        it('should return 200 status with correct information.', function (done) {
            supertest(app).post('/v1/user/register')
                .send({
                    username: "amirking59",
                    password: "32919003aA",
                    email: "ah.rezayy@chmail.ir"
                })
                .expect(201)
                .then(function (response) {
                    const { body } = response;
                    expect(body.errors).have.length(0)

                    done()
                })
                .catch((function (err) {
                    done(err)
                }))
        })
        it('should successfully create a user.', async function () {
            const user = await db.User.findOne({
                where: {
                    username: 'amirking59',
                    email: 'ah.rezayy@chmail.ir'
                }
            })

            if (!user) throw new Error("user not found")
        })
        it('should return 400 status with incomplete information.', function (done) {
            supertest(app).post('/v1/user/register')
                .send({
                    username: "amirking59",
                    password: "32919003aA",
                })
                .expect(400)
                .then(function (response) {
                    const { body } = response;
                    expect(body.errors).have.length(1)

                    done()
                })
                .catch((function (err) {
                    done(err)
                }))
        })
        it('should return 400 status with incorrect email and password with length of below 6.', function (done) {
            supertest(app).post('/v1/user/register')
                .send({
                    username: "amirking59",
                    password: "32919",
                    email: 'sdfsd'
                })
                .expect(400)
                .then(function (response) {
                    const { body } = response;
                    expect(body.errors).have.length(2)

                    done()
                })
                .catch((function (err) {
                    done(err)
                }))
        })
    })
    describe('POST v1/user/login', function () {
        it('should return 200 status with correct information.', function (done) {
            supertest(app).post('/v1/user/login')
                .send({
                    username: "amirking59",
                    password: "32919003aA",
                })
                .expect(200)
                .then(function () {
                    done()
                })
        })
        it('should successfully login a user.', function (done) {
            supertest(app).post('/v1/user/login')
                .send({
                    username: "amirking59",
                    password: "32919003aA",
                })
                .expect(200)
                .then(function (response) {
                    const { body } = response;
                    expect(body).have.property('token')

                    done()
                })
                .catch((function (err) {
                    done(err)
                }))
        })
        it('should return 400 status with incomplete information.', function (done) {
            supertest(app).post('/v1/user/login')
                .send({
                    username: "amirking59",
                })
                .expect(400)
                .then(function (response) {
                    const { body } = response;
                    expect(body.errors).have.length(1)

                    done()
                })
                .catch((function (err) {
                    done(err)
                }))
        })
        it('should return 400 status with incorrect email and password.', function (done) {
            supertest(app).post('/v1/user/login')
                .send({
                    username: "amirkifsdfsdfn",
                    password: "32919dsfsdfds",
                })
                .expect(200)
                .then(function (response) {
                    const { body } = response;
                    expect(body.errors).have.length(1)

                    done()
                })
                .catch((function (err) {
                    done(err)
                }))
        })
    })
})
