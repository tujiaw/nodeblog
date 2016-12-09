var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:name', function(req, res, next) {
  res.render('users', {
    name: req.params.name
  });
});

module.exports = router;
