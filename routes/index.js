module.exports = function(app) {
  app.get('/', function(req, res) {
    res.redirect('/posts');
  });

  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
  app.use('/about', require('./about'));
  app.use('/tags', require('./tags'));
  app.use('/search', require('./search'));
  app.use('/archives', require('./archives'));
  app.use('/uptoken', require('./uptoken'));

  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.render('404');
    }
  });
}
