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

  return new Promise((reject, resolve) => {
    this.db.get('users', (err, value) => {

      if(err) reject(err)

      let users

      console.log(value)

      if(value){
        users = JSON.parse(value);
      }else{
        users = new Array()
      }

      users.push(user)


      this.db.put('users', JSON.stringify(users), (err) => {
        if(err) reject(err)

        resolve()
      })
    })
  })
}

UserModel.prototype.getUserById = function (_id) {
  return new Promise((reject, resolve) => {
    this.db.get('users', (err, value) => {
      if(err) reject(err);

      resolve(JSON.parse(value).filter( user => user._id === _id )[0])
    })
  })
}

UserModel.prototype.getUserByEmail = function (_email) {
  return new Promise((reject, resolve) => {
    this.db.get('users', (err, value) => {
      if(err) reject(err);

      resolve(JSON.parse(value).filter( user => user.email === _email )[0])
    })
  })
}

module.exports = (db) => {
  return new UserModel(db)
}