/*
* user.js (Controller)
* Responsible for programming logic.
*/
const jwt = require('jwt-simple'),
      cfg = require('./../config.js')

function PostController (postModel) {
  this.postModel = postModel
  
}

PostController.prototype.create = function (req, res) {

  req.checkBody('title').notEmpty()
  req.checkBody('body').notEmpty()
  req.checkBody('path').notEmpty()
  
  req.getValidationResult().then((result) => {

    if(!result.isEmpty()) {
      res.sendStatus(412).end()
      return
    }

    this.postModel
      .create(req.body)
      .then((post) => {
        res.status(202).json(post).end()
      })
      .catch((err) => {
        if(err === true)
          res.status(412).end()
        else
          res.status(500).end()
      })
  }).catch(err => res.status(412).end())
}

PostController.prototype.update = function(req, res) {

  req.checkBody('title').notEmpty()
  req.checkBody('body').notEmpty()
  req.checkBody('path').notEmpty()
  req.checkBody('_id').notEmpty()

  req.getValidationResult().then((result) => {

    if(!result.isEmpty()) {
      res.sendStatus(412).end()
      return
    }

    this.postModel
    .update(req.body)
    .then((post) => {
      res.status(200).json(post).end()
    }).catch(err => {
      console.log(err)
      res.sendStatus(500).end()
    })

  }).catch(err => res.sendStatus(500).end());
}

PostController.prototype.delete = function(req, res) {

  req.checkParams('_id').notEmpty()

  req.getValidationResult().then((result) => {

    if(!result.isEmpty()) {
      res.sendStatus(412).end()
      return
    }

    this.postModel
    .delete(req.params._id)
    .then(() => {
      res.status(200).json().end()
    }).catch(err => res.sendStatus(500).end())

  }).catch(err => res.sendStatus(500).end());
}

PostController.prototype.getAll = function(req, res) {
  this.postModel
  .getAll(req.body)
  .then((posts) => {
    res.status(200).json(posts).end()
  }).catch(err => res.sendStatus(500).end())
}

PostController.prototype.getPostById = function(req, res) {

  req.checkParams('_id').notEmpty()

  req.getValidationResult().then((result) => {

    if(!result.isEmpty()) {
      res.sendStatus(412).end()
      return
    }

    this.postModel
    .getPostById(req.params._id)
    .then((post) => {
      if(post)
        res.status(200).json(post).end()
      else
        res.sendStatus(404).end()

    }).catch(err => res.sendStatus(500).end())

  }).catch(err => res.sendStatus(500).end());
}

module.exports = (userModel) => {
  return new PostController(userModel)
} 