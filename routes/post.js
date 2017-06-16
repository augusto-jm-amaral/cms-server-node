const express        = require('express'),
      router         = express.Router(),
      db             = require('./../db.js'),
      PostModel      = require('./../models/post.js')(db),
      PostController = require('./../controllers/post.js')(PostModel)
      auth           = require('./../auth.js')()

router.get('/', PostController.getAll.bind(PostController))
	  .get('/:_id', PostController.getPostById.bind(PostController))
	  .post('/', auth.authenticate(), PostController.create.bind(PostController))
      .put('/:_id', auth.authenticate(), PostController.update.bind(PostController))
	  .delete('/:_id', auth.authenticate(), PostController.delete.bind(PostController))

module.exports = router
  
