const app = require('../app')
const supertest = require('supertest')

describe('simple test', function () {
    it('should run', function (done) {
        supertest(app).get('/')
            .then(function () {
                done()
            })
            .catch((function (err) {
                done(err)
            }))
    })
})