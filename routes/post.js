const express        = require('express'),
      router         = express.Router(),
      db             = require('./../db.js'),
      PostModel      = require('./../models/post.js')(db),
      PostController = require('./../controllers/post.js')(PostModel)

router.post('/', PostController.create.bind(PostController))
      .put('/:_id', PostController.update.bind(PostController))
	  .get('/', PostController.getAll.bind(PostController))
	  .get('/:_id', PostController.getPostById.bind(PostController))
	  .delete('/:_id', PostController.delete.bind(PostController));

module.exports = router
  
