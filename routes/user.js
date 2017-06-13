const express        = require('express'),
      router         = express.Router(),
      db             = require('./../db.js'),
      UserModel      = require('./../models/user.js')(db),
      UserController = require('./../controllers/user.js')(UserModel)

router.post('/', UserController.create.bind(UserController));
router.post('/login', UserController.authenticate.bind(UserController));

module.exports = router
  
