/**
 * Created by tujiaw on 2017/1/17.
 */
var express = require('express');
var router = express.Router();
var Posts = require('../controller/posts');

var checkLogin = require('../middle/check').checkLogin;

// GET /signout 登出
router.get('/', function(req, res, next) {
  var searchText = req.query.q;
  if (searchText.length > 0) {
    Posts.searchPost(searchText, function(error, posts) {
      if (error) {
        next(new Error(error));
      } else {
        console.log(posts);
        var response = { items: [] };
        posts.some(function(item, index) {
          var maxResults = 8;
          if (index > maxResults) {
            return false;
          }
          response.items.push({
            // language: item.tags.join(' '),
            name: item.title,
            description: item.tags.join(' '),
            html_url: '/posts/' + item._id,
          })
        });

        res.json(response);
      }
    });
  }
});

module.exports = router;