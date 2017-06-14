/*
* user.js (Model)
* Responsible for db communication with users.
*/
const shortid = require('shortid')

function PostModel (db) {

  this.db = db;
}

PostModel.prototype.create = function (post) {

  post._id = shortid.generate()

  return new Promise((resolve, reject) => {
    this.db.get('posts', (err, value) => {

      let posts = new Array()

      if(value){
        posts = JSON.parse(value)
      }

      let exists = posts.some((obj) => {
          return 'path' in obj && obj['path'] == post.path
      })

      if(exists){
        reject(exists)
      }else{

        posts.push(post)

        this.db.put('posts', JSON.stringify(posts), err => {
            resolve(post)
        })
      }
    })
  })
}

PostModel.prototype.update = function (post) {

  return new Promise((resolve, reject) => {
    this.db.get('posts', (err, value) => {

      let posts

      if(value){
        posts = JSON.parse(value)

        let index = posts.findIndex( obj => obj._id === post._id )
        
        posts[index] = post

        this.db.put('posts', JSON.stringify(posts), (err) => {

          if(err)
            reject(err)
          else
            resolve(post)
        })
      }else{
        reject()
      }
    })
  })
}

PostModel.prototype.delete = function (_id) {

  return new Promise((resolve, reject) => {
    this.db.get('posts', (err, value) => {

      let posts

      if(value){
        posts = JSON.parse(value)

        let newPostList = posts.filter( obj => obj._id != _id)

        this.db.put('posts', JSON.stringify(newPostList), (err) => {

          if(err)
            reject(err)
          else
            resolve()
        })

      }else{
        reject()
      }
    })
  })
}

PostModel.prototype.getAll = function (_id) {

  return new Promise((resolve, reject) => {
    this.db.get('posts', (err, value) => {

      let posts = []

      if(value){
        posts = JSON.parse(value)
      }

      resolve(posts)  
    })
  })
}

PostModel.prototype.getPostById = function (_id) {
  return new Promise((resolve, reject) => {
    this.db.get('posts', (err, value) => {
      if(value){
        let posts = JSON.parse(value)
        let post = posts.filter( post => post._id == _id )[0]
        resolve(post)
      } else {
        resolve()
      }
    })
  })
}

PostModel.prototype.getPostByPath = function (_path) {
  return new Promise((resolve, reject) => {
    this.db.get('posts', (err, value) => {

      if(value)
        resolve(JSON.parse(value).filter( post => post.path == _path )[0])
      else
        resolve()
    })
  })
}

module.exports = (db) => {
  return new PostModel(db)
}