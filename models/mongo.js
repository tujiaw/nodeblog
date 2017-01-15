var config = require('config-lite');
var marked = require('marked');
var mongoose = require('mongoose');
// DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated
mongoose.Promise = global.Promise;
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

mongoose.connect(config.mongodb);
marked.setOptions({
  highlight: function(code) {
    return require("highlight.js").highlightAuto(code).value;
  }
});

const PROFILE_COUNT = 150;
module.exports.mongoose = mongoose;
module.exports.mongoHelp = {
  addOneCreateAt: function(result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
    }
  },
  addAllCreateDateTime: function(results) {
    results.forEach(function(item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    })
  },
  addAllCreateDate: function(results) {
    results.forEach(function(item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD');
    })
  },
  postsContent2html: function(posts, isProfile) {
    return posts.map(function(post) {
      post.content = marked(isProfile ? post.content.substr(0, PROFILE_COUNT) : post.content);
      return post;
    })
  },
  postContent2html: function(post, isProfile) {
    if (post) {
      post.content = marked(isProfile ? post.content.substr(0, PROFILE_COUNT) : post.content);
    }
    return post;
  }
}
