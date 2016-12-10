var Post = require('../lib/mongo').Post;
var marked = require('marked');

Post.plugin('contentToHtml', {
  afterFind: function(posts) {
    return posts.map(function(post) {
      post.content = marked(post.content);
      return post;
    });
  },
  afterFindOne: function(post) {
    if (post) {
      post.content = marked(post.content);
    }
    return post;
  }
});

module.exports = {
  create: function(post) {
    return Post.create(post).exec();
  },
  getPostById: function(postId) {
    return Post.findOne({ _id: postId})
      .populate({ path: 'author', model: 'User' })
      .addCreateAt()
      .contentToHtml()
      .exec();
  },
  getPosts: function(author) {
    var query = {};
    if (author) {
      query.author = author;
    }
    return Post.find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: -1 })
      .addCreateAt()
      .contentToHtml()
      .exec();
  },
  incPv: function(postId) {
    return Post.update({ _id: postId }, { $inc: {pv: 1} }).exec();
  },
  getRawPostById: function(postId) {
    return Post.findOne({ _id: postId })
      .populate({ path: 'author', model: 'User'})
      .exec();
  },
  updatePostById: function(postId, author, content) {
    return Post.update({ author: author, _id: postId}, { $set: content }).exec();
  },
  delPostById: function(postId, author) {
    return Post.remove({ author: author, _id: postId }).exec();
  }
};
