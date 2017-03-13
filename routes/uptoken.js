var express = require('express');
var router = express.Router();
var qiniu = require('../controller/qiniu');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var uptoken = qiniu.uptoken();
  if (uptoken) {
    res.json({
      uptoken: uptoken,
    });
  }
});

module.exports = router;
