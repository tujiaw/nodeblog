/**
 * Created by tujiaw on 2017/1/14.
 */
var express = require('express');
var router = express.Router();
var Posts = require('../controller/posts');

/* GET users listing. */
router.get('/:name', function(req, res, next) {
  var tagName = req.params.name;
  Posts.getPostByTag(tagName, function(error, result) {
    if (error) {
      next(new Error(error));
    } else {
      res.render('tags', { tagName: tagName, postList: result });
    }
  })
});

module.exports = router;
