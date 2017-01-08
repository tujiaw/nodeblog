/**
 * Created by tujiaw on 2017/1/8.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('about');
});

module.exports = router;
