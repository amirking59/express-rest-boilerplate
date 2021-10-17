const app = require('../app')
const supertest = require('supertest')
const { expect } = require('chai')
const debug  = require('debug')('test')

describe('index api', function () {
    describe('GET /', function () {
        it('should return correct response with 200 status.', function (done) {
            supertest(app).get('/')
                .then(function (response) {
                    const { msg } = response.body;
                    expect(response.status).to.be.equal(200)
                    expect(response.body).to.have.property('msg')

                    expect(msg).to.be.a('string');
                    expect(msg).to.equal('express is running')

                    done()
                })
                .catch((function (err) {
                    done(err)
                }))
        })
    })
})