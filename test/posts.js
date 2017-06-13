/*
*	File: routes/posts.js
* Author: Augusto José
* Description: File responsible for TDD /posts/*
*/

const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      db        = require('./../db.js'),
      // userModel = require('./../models/user.js')(db),
      server    = require('./../index.js'),
      expect    = chai.expect

chai.use(chaiHttp)

describe('Posts', () => {

  beforeEach((done) => {

    // userModel.deleteAllUsers((err) => {
    //   if(err) console.log(err)

    //   done()
    // })
    done()
  })

  describe('/posts GET', () => {
    it('Get all posts', (done) => {

      done()
    })
  })

  describe('/posts/:_id GET', () => {
    it('Get post using id', (done) => {

      done()
    })
  })

  describe('/posts/:_path GET', () => {
    it('Get a post using path', (done) => {

      done()
    })
  })
  
  describe('/posts POST', () => {
    it('Create a post', (done) => {

      done()
    })
  })  

  describe('/posts/:_id PUT', () => {
    it('Update a post', (done) => {

      done()
    })
  })

  describe('/posts/:_id DELETE', () => {
    it('Get a post using path', (done) => {

      done()
    })
  })
      // let user = {
      //   name: 'Augusto',
      //   email: 'augusto@email.com',
      //   password: '123456'
      // }

      // chai.request(server)
      // .post('/users')
      // .send(user)
      // .end((err, res) => {
      //   expect(res).to.have.status(202)
      //   done()
      // })
})


