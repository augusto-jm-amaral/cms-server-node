/*
* auth.js 
* This is responsable for authentication of users
*/
const passport    = require("passport"),
      passportJWT = require("passport-jwt"),
      cfg         = require("./config.js"),
      ExtractJwt  = passportJWT.ExtractJwt,
      Strategy    = passportJWT.Strategy,
      db          = require('./db.js'),
      UserModel   = require('./models/user.js')(db),
      params      = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
      }

module.exports = () => {

  var strategy = new Strategy(params, function(payload, done) {
    
    var user = UserModel.getUserById(payload._id) || null;

    if (user) {
      return done(null, {_id: user._id});
    } else {
      return done(new Error("User not found"), null);
    }

  })

  passport.use(strategy)

  return {
    initialize: function() {
      return passport.initialize()
    },
    authenticate: function() {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  }
}