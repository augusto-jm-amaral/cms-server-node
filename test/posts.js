/*
*	File: routes/posts.js
* Author: Augusto José
* Description: File responsible for TDD /posts/*
*/

const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      db        = require('./../db.js'),
      server    = require('./../index.js'),
      expect    = chai.expect

chai.use(chaiHttp)

describe('Posts', () => {

  let posts = [
    {_id: 1, title: 'Post1', body: 'Lorem ipsum..', path: '/news/1' },
    {_id: 2, title: 'Post2', body: 'Lorem ipsum..', path: '/news/2' },
    {_id: 3, title: 'Post3', body: 'Lorem ipsum..', path: '/news/3' }
  ]

  beforeEach((done) => {
    db.put('posts', JSON.stringify(posts), err => done())
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

  describe('/posts?path=:_path GET', () => {
    it('Get a post using path', (done) => {

      let post = posts[3]
      
      chai.request(server)
      .get('/posts?path=' + post.path)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('_id', post._id)
        expect(res.body).to.have.property('title', post.title)
        expect(res.body).to.have.property('body', post.body)
        expect(res.body).to.have.property('path', post.path)
        done()
      })

      done()
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
      .send(post)
      .end((err, res) => {
        expect(res).to.have.status(202)
        expect(res.body).to.have.property('_id')
        expect(res.body).to.have.property('title', post.title)
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
      .send(post)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('title', post.title)
        done()
      })
    })
  })

  describe('/posts/:_id DELETE', () => {
    it('Get a post using path', (done) => {
      
      let post = posts[2]

      chai.request(server)
      .delete('/posts/' + post._id)
      .end((err, res) => {
        expect(res).to.have.status(200)
        db.get('posts', (err, value) => {
          expect(JSON.parse(value)).to.have.lengthOf(2)
          done()
        })
      })
    })
  })
})


