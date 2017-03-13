'use strict'

var qiniu = require('qiniu');
var config = require('config-lite');
const uuidV1 = require('uuid/v1');

qiniu.conf.ACCESS_KEY = config.qiniu.ak;
qiniu.conf.SECRET_KEY = config.qiniu.sk;
//构建上传策略函数
function getUptoken(bucket, key) {
  //  var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
  var putPolicy = new qiniu.rs.PutPolicy(bucket);
  putPolicy.saveKey = uuidV1();
  return putPolicy.token();
}

//生成上传 Token
module.exports.uptoken = function() {
    return getUptoken(config.qiniu.bucket);
}
