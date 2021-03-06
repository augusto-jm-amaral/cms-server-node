/*
* user.js (Controller)
* Responsible for programming logic.
*/
const jwt = require('jwt-simple'),
      cfg = require('./../config.js')

function UserController (userModel) {
  this.userModel = userModel

}

UserController.prototype.create = function (req, res) {

  let self = this;

  req.checkBody('name').notEmpty()
  req.checkBody('email').notEmpty()
  req.checkBody('password').notEmpty()

  req.getValidationResult().then((result) => {

    if(!result.isEmpty()) {
      res.sendStatus(412).end()
      return
    }

    self.userModel
      .create(req.body)
      .then(() => {
        res.status(202).end()
      })
      .catch((err) => {
        if(err === true){
          res.status(412).end()
        }else
          res.status(500).end()
      })

  }).catch(err => res.status(412).end())
}

UserController.prototype.authenticate = function(req, res) {

  req.checkBody('email').notEmpty()
  req.checkBody('password').notEmpty()

  req.getValidationResult().then((result) => {

    if(!result.isEmpty()) {
      res.sendStatus(412).end()
      return
    }

    this.userModel.getUserByEmail(req.body.email).then((user) => {

      if (user && (req.body.password === user.password)) {

        let payload = {
          _id: user._id
        }

        res.status(200)
          .json({
            token: jwt.encode(payload, cfg.jwtSecret),
            name: user.name,
            _id: user._id
          }).end();

      } else {
        res.sendStatus(401).end();
      }

    }).catch( err => res.sendStatus(500).end())
  }).catch(err => res.status(500).end());
}

module.exports = (userModel) => {
  return new UserController(userModel)
}
