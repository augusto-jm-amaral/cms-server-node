const express          = require('express'),
      app              = express(),
      bodyParser       = require('body-parser'),
      expressValidator = require('express-validator')
      auth             = require('./auth.js')()
      db               = require('./db.js'),
      PostModel        = require('./models/post.js')(db)
      cors             = require('cors')

app.set('port', (process.env.PORT || 5000))
app.use(cors())
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(auth.initialize())
app.use(expressValidator())

const user = require('./routes/user.js'),
      post = require('./routes/post.js')

app.use('/users', user)
app.use('/posts', post)


app.use((req, res, next) => {

	PostModel.getPostByPath(req.path)
	.then((post) => {

		if(post){
			res.status(200).json(post).end()
		}else{
			next()
		}
	})
	.catch((err) => next())
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
})

module.exports = app
