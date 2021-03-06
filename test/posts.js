/*
*	File: routes/posts.js
* Author: Augusto José
* Description: File responsible for TDD /posts/*
*/

const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      db        = require('./../db.js'),
      server    = require('./../index.js'),
      jwt       = require('jwt-simple'),
      cfg       = require('./../config.js'),
      expect    = chai.expect

chai.use(chaiHttp)

describe('Posts', () => {

  let posts = [
    {_id: 1, title: 'Post1', body: 'Lorem ipsum..', path: '/news/1' },
    {_id: 2, title: 'Post2', body: 'Lorem ipsum..', path: '/news/2' },
    {_id: 3, title: 'Post3', body: 'Lorem ipsum..', path: '/news/3' }
  ]

  let user = {
    _id: '123456',
    name: 'Augusto',
    email: 'augusto@email.com',
    password: '123456'
  }

  let payload = {
    _id: user._id
  }

  let token = jwt.encode(payload, cfg.jwtSecret)

  before((done) => {
    db.put('users', JSON.stringify([user]), err => done())
  })

  beforeEach((done) => {
    db.put('posts', JSON.stringify(posts), err => done())
  })

  after((done) => {
    db.put('posts', JSON.stringify([]), (err) => {
      db.put('users', JSON.stringify([]), (err) => {
        done()
      })
    })
  })

  describe('/posts GET', () => {
    it('Get all posts', (done) => {
      
      chai.request(server)
      .get('/posts')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.lengthOf(3)
        done()
      })
    })
  })

  describe('/posts/:_id GET', () => {
    it('Get post using id', (done) => {

      let post = posts[0]
      
      chai.request(server)
      .get('/posts/' + post._id)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('_id', post._id)
        expect(res.body).to.have.property('title', post.title)
        expect(res.body).to.have.property('body', post.body)
        expect(res.body).to.have.property('path', post.path)
        done()
      })

    })
  })
  
  describe('/posts POST', () => {
    it('Create a post', (done) => {

      let post = { 
        title: 'Create A Post', 
        body: 'Lorem ipsum...', 
        path: '/news/newpost'
      }

      chai.request(server)
      .post('/posts')
      .set('Authorization',`JWT ${token}`)
      .send(post)
      .end((err, res) => {
        expect(res).to.have.status(202)
        expect(res.body).to.have.property('_id')
        expect(res.body).to.have.property('title', post.title)
        done()
      })
    })

    it('Create a post without Authorization header', (done) => {

      let post = { 
        title: 'Create A Post', 
        body: 'Lorem ipsum...', 
        path: '/news/newpost'
      }

      chai.request(server)
      .post('/posts')
      .send(post)
      .end((err, res) => {
        expect(res).to.have.status(401)
        done()
      })
    })
  })  

  describe('/posts/:_id PUT', () => {
    it('Update a post', (done) => {
      
      let post = posts[2]
      post.title = 'Change title!'

      chai.request(server)
      .put('/posts/' + post._id)
      .set('Authorization',`JWT ${token}`)
      .send(post)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('title', post.title)
        done()
      })
    })

    it('Update a post without Authorization header', (done) => {
      
      let post = posts[2]
      post.title = 'Change title!'

      chai.request(server)
      .put('/posts/' + post._id)
      .send(post)
      .end((err, res) => {
        expect(res).to.have.status(401)
        done()
      })
    })
  })

  describe('/posts/:_id DELETE', () => {
    it('Delete post using _id', (done) => {
      
      let post = posts[2]

      chai.request(server)
      .delete('/posts/' + post._id)
      .set('Authorization',`JWT ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200)
        db.get('posts', (err, value) => {
          expect(JSON.parse(value)).to.have.lengthOf(2)
          done()
        })
      })
    })

    it('Delete post using _id without Authorization header', (done) => {
      
      let post = posts[2]

      chai.request(server)
      .delete('/posts/' + post._id)
      .end((err, res) => {
        expect(res).to.have.status(401)
        done()
      })
    })
  })

  describe('/:_path GET', () => {
    it('Get a post using path', (done) => {
      
      let post = posts[2]

      chai.request(server)
      .get(post.path)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('title', post.title)
        done()
      })
    })
  })

})


