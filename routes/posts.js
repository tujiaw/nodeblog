var express = require('express');
var router = express.Router();
var Posts = require('../controller/posts');
var checkLogin = require('../middle/check').checkLogin;

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
router.get('/', function(req, res, next) {
  var author = req.query.author;
  var page = req.query.page || 1;
  page = parseInt(page);
  Posts.getPostsProfile(author, page, function(error, pagePosts, pageNumbers, lastPage) {
    if (error) {
      next(Error(error));
    } else {
      res.render('posts', {
        posts: pagePosts,
        page: page,
        pageNumbers: pageNumbers,
        lastPage: lastPage,
      });
    }
  });
});

// POST /posts 发表一篇文章
router.post('/', checkLogin, function(req, res, next) {
  var author = req.session.user._id;
  var title = req.fields.title;
  var content = req.fields.content;
  var tags = req.fields.tags.split(';');
  console.log(tags);

  try {
    if (!title.length) {
      throw new Error('请填写标题');
    }
    if (!content.length) {
      throw new Error('请填写内容');
    }
  } catch(e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

  var post = {
    author: author,
    title: title,
    content: content,
    pv: 1,
    tags: tags,
  };

  Posts.create(post, function(error, result) {
    if (error) {
      next(new Error(error));
    } else {
      post = result._doc;
      req.flash('success', '发表成功');
      res.redirect(`/posts/${post._id}`);
    }
  });
});

// GET /posts/create 发表文章页
router.get('/create', checkLogin, function(req, res, next) {
  res.render('create');
});

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', function(req, res, next) {
  var postId = req.params.postId;
  Posts.getPostById(postId, function(error, result) {
    try {
      if (error) {
        throw new Error(error);
      }
      if (!result) {
        throw new Error('该文章不存在');
      }
      res.render('post', {
        post: result
      })
    } catch (e) {
      next(e);
    }
  });
});

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function(req, res, next) {
  var postId = req.params.postId;
  var author = req.session.user._id;

  Posts.getRawPostById(postId, function(error, result) {
    try {
      if (error) {
        throw new Error('获取源文章内容出错:' + error);
      }

      if (!result) {
        throw new Error('该文章不存在');
      }

      if (author.toString() !== result.author._id.toString()) {
        throw new Error('权限不足');
      }

      res.render('edit', { post: result });
    } catch (e) {
      next(e);
    }
  });
});

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function(req, res, next) {
  var postId = req.params.postId;
  var author = req.session.user._id;
  var title = req.fields.title;
  var content = req.fields.content;
  var tags = req.fields.tags.split(';');
  console.log('11111111111111:' + tags);

  try {
    if (title.length == 0) {
      throw new Error('标题不能为空');
    }
    if (content.length == 0) {
      throw new Error('内容不能为空');
    }
    if (tags.length == 0) {
      throw new Error('标签不能为空');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

  Posts.updatePostById(postId, author, { title: title, content: content, tags: tags }, function(error) {
    if (error) {
      next(new Error(error));
    } else {
      req.flash('success', '编辑文章成功');
      res.redirect(`/posts/${postId}`);
    }
  });
});

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function(req, res, next) {
  var postId = req.params.postId;
  var author = req.session.user._id;

  Posts.delPostById(postId, author, function(error) {
    if (error) {
      next(new Error(error));
    } else {
      req.flash('success', '删除文章成功');
      res.redirect('/posts');
    }
  });
});

module.exports = router;