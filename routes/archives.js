/**
 * Created by tujiaw on 2017/1/31.
 */
var express = require('express');
var router = express.Router();
var Posts = require('../controller/posts');

// GET /archives 归档
router.get('/', function(req, res, next) {
  Posts.getPostTitle(function(error, result) {
    if (error) {
      next(new Error(error));
    } else {
      res.render('archives');
    }
  });
});

module.exports = router;