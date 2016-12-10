module.exports = {
  checkLogin: function(req, res, next) {
    console.log('check login 111');
    if (!req.session.user) {
      req.flash('error', '未登录');
      return res.redirect('/signin');
    }
    console.log('check login 222');
    next();
  },

  checkNotLogin: function(req, res, next) {
    console.log('check not login 111');
    if (req.session.user) {
      req.flash('error', '已登录');
      return res.redirect('back');
    }
    console.log('check not login 222');
    next();
  }
};