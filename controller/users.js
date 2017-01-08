/**
 * Created by tujiaw on 2017/1/7.
 */
var UsersModel = require('../models/users');
var MongoHelp = require('../models/mongo').mongoHelp;

module.exports = {
  create: function(user, cb) {
    var obj = new UsersModel(user);
    obj.save(cb);
  },
  getUserByName: function(name, cb) {
    UsersModel.getUserByName(name).then(function(user) {
      cb(0, user);
    }).catch(function(error) {
      cb(error);
    });
  }
}