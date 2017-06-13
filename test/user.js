/*
*	File: routes/user.js
* Author: Augusto José
* Description: File responsible for TDD /users/*
*/
if (!global.Promise) {
  global.Promise = require('q');
}

const chai      = require('chai'),
      jwt       = require('jwt-simple'),
      cfg       = require('./../config.js')
      chaiHttp  = require('chai-http'),
      db        = require('./../db.js'),
      server    = require('./../index.js'),
      expect    = chai.expect

chai.use(chaiHttp)

describe('Login', () => {

  let user = {
    _id: '123456',
    name: 'Augusto',
    email: 'augusto@email.com',
    password: '123456'
  }

  beforeEach((done) => {
    db.del('users', err => {

      let users = []
      users.push(user)

      db.put('users', JSON.stringify(users), (err) => {
        done()
      })
    })
  })

  describe('/users/login POST', () => {
    it('Get a token', (done) => {

      let payload = {
        _id: user._id
      }

      let token = jwt.encode(payload, cfg.jwtSecret)

      chai.request(server)
      .post('/users/login')
      .send({email: user.email, password: user.password})
      .end((err, res) => {

        expect(res).to.have.status(200)
        expect(res.body).to.have.property('token', token)
        done()
      })
    })

    it('login user password incorrect', (done) => {

      chai.request(server)
      .post('/users/login')
      .send({email: user.email, password: 'otherpassword'})
      .end((err, res) => {

        expect(res).to.have.status(401)
        done()
      })
    })

    it('login no parameters', (done) => {

      chai.request(server)
      .post('/users/login')
      .send({})
      .end((err, res) => {

        expect(res).to.have.status(412)
        done()
      })
    })

  })
})

describe('Users', () => {

  beforeEach((done) => {
    db.del('users', (err) => {
      done()
    })
  })

  describe('/users POST', () => {
    it('Create a user', (done) => {

      let user = {
        name: 'Augusto',
        email: 'augusto@email.com',
        password: '123456'
      }

      chai.request(server)
      .post('/users')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(202)
        done()
      })
    })

    it('Create a user without name', (done) => {

      let user = {
        email: 'augusto@email.com',
        password: '123456',
      }

      chai.request(server)
      .post('/users')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(412)
        done()
      })
    })

    it('Create a user with same email', (done) => {

      let user = {
        name: 'Augusto',
        email: 'augusto@email.com',
        password: '123456'
      }

      chai.request(server)
      .post('/users')
      .send(user)
      .end((err, res) => {

        chai.request(server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(412)
          done()
        });
      })
    })

  })

})


