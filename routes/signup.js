var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var Users = require('../controller/users');
var checkNotLogin = require('../middle/check').checkNotLogin;

// GET /signup 注册页
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signup');
});

// POST /signup 用户注册
router.post('/', checkNotLogin, function(req, res, next) {
  var name = req.fields.name;
  var gender = req.fields.gender;
  var bio = req.fields.bio;
  var avatar = req.files.avatar.path.split(path.sep).pop();
  var password = req.fields.password;
  var repassword = req.fields.repassword;

  try {
    if (!(name.length >= 1 && name.length <= 20)) {
      throw new Error('姓名不能为空并且不超过20个字符');
    }
    if (password.length < 6) {
      throw new Error('密码至少6个字符');
    }
    if (password !== repassword) {
      throw new Error('两次输入的密码不一致');
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('性别只能是m,f,x');
    }
    if (!req.files.avatar.name) {
      throw new Error('请选择头像');
    }
    if (bio.length > 100) {
      throw new Error('个人简介不能超过100个字符');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('/signup');
  }

  password = sha1(password);
  var user = {
    name: name,
    password: password,
    gender: gender,
    bio: bio,
    avatar: avatar
  };

  Users.create(user, function(error, result) {
    if (error) {
      if (error.message.match('E11000 duplicate key')) {
        req.flash('error', '用户名已被占用');
        return res.redirect('/signup');
      }
      next(error);
    } else {
      user = result._doc;
      delete user.password;
      req.session.user = user;
      req.flash('success', '注册成功');
      res.redirect('/posts');
    }
  });
});

module.exports = router;