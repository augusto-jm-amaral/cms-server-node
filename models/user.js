/*
* user.js (Model)
* Responsible for db communication with users.
*/
const shortid = require('shortid')

function UserModel (db) {

  this.db = db;

}

UserModel.prototype.create = function (user) {

  user._id = shortid.generate()

  return new Promise((resolve, reject) => {
    this.db.get('users', (err, value) => {

      let users = new Array()

      if(value){
        users = JSON.parse(value)
      }

      let exists = users.some((obj) => {
          return 'email' in obj && obj['email'] == user.email
      });

      if (exists) {
        reject(exists)
      } else {
        users.push(user)

        this.db.put('users', JSON.stringify(users), (err) => {

          if(err) 
            reject(err)
          else 
            resolve()
          
        })
      }
    })
  })
}

UserModel.prototype.getUserById = function (_id) {
  return new Promise((resolve, reject) => {
    this.db.get('users', (err, value) => {

      if(err) 
        reject(err)
      else
        resolve(JSON.parse(value).filter( user => user._id === _id )[0])

    })
  })
}

UserModel.prototype.getUserByEmail = function (_email) {

  return new Promise((resolve, reject) => {
    this.db.get('users', (err, value) => {

      if(err) 
        reject(err)
      else{
        if(value)
          resolve(JSON.parse(value).filter( user => user.email === _email )[0])
        else
          resolve()
      }

    })
  })
}

UserModel.prototype.deleteAllUsers = function () {

  return new Promise((resolve, reject) => {
    this.db.del('users', (err) => {

      if(err) 
        reject()
      else
        resolve()
    })
  })
}

module.exports = (db) => {
  return new UserModel(db)
}