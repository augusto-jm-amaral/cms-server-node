const express          = require('express'),
      app              = express(),
      bodyParser       = require('body-parser'),
      expressValidator = require('express-validator')
      auth             = require('./auth.js')()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(auth.initialize())
app.use(expressValidator())

const user = require('./routes/user.js')

app.use('/users', user)

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
})

module.exports = app