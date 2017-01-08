/**
 * Created by tujiaw on 2017/1/7.
 */
var PostsModel = require('../models/posts');
var MongoHelp = require('../models/mongo').mongoHelp;
var config = require('config-lite');
var PAGE_COUNT = config.pageCount;

module.exports = {
  create: function(post, cb) {
    var obj = new PostsModel(post);
    obj.save(cb)
  },
  getPostById: function(postId, cb) {
    Promise.all([
      PostsModel.getPostById(postId),
      PostsModel.incPv(postId)
    ]).then(function(result) {
        var post = result[0];
        if (post) {
          MongoHelp.addOneCreateAt(post);
          MongoHelp.postContent2html(post);
          cb(0, post);
        }
    }).catch(function(error) {
      cb(error);
    });
  },
  getPostsProfile: function(author, page, cb) {
    Promise.all([
      PostsModel.getPostsProfile(author, page),
      PostsModel.getPostsCount(author),
    ]).then(function(results) {
      if (results.length > 1) {
        var pagePosts = results[0];
        var totalCount = results[1];
        MongoHelp.addAllCreateAt(pagePosts);
        MongoHelp.postsContent2html(pagePosts, true);

        var pageNumbers = [];
        var lastPage = Math.ceil(totalCount / PAGE_COUNT);
        if (page <= lastPage) {
          var i = 1;
          if (page <= 3) {
            for (i = 1; i <= page; i++) {
              pageNumbers.push(i);
            }
            for (i = page + 1; i <= lastPage && pageNumbers.length < 5; i++) {
              pageNumbers.push(i);
            }
          } else {
            pageNumbers.push(0);
            for (i = page - 2; i <= Math.min(page + 2, lastPage); i++) {
              pageNumbers.push(i);
            }
          }
          if (lastPage > i) {
            pageNumbers.push(0);
          }
        }

        cb(0, pagePosts, pageNumbers, lastPage);
      } else {
        cb('获取文章列表失败');
      }
    }).catch(function(error) {
      cb(error);
    });
  },
  getRawPostById: function(postId, cb) {
    PostsModel.getRawPostById(postId).then(function(result) {
      cb(0, result);
    }).catch(function(error) {
      cb(error);
    });
  },
  updatePostById: function(postId, author, content, cb) {
    PostsModel.updatePostById(postId, author, content).then(function() {
      cb(0);
    }).catch(function(error) {
      cb(error);
    });
  },
  delPostById: function(postId, author, cb) {
    PostsModel.delPostById(postId, author).then(function() {
      cb(0);
    }).catch(function(error) {
      cb(error);
    });
  }
}
