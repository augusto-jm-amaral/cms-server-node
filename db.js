/*
* db.js
* This file export an instance of database.
* Using LevelUp db.
*/
const levelup = require('levelup'),
      db      = levelup('./mydb')

module.exports = db