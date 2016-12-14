module.exports = {
  port: 3000,
  session: {
    secret: 'nodeblog',
    key: 'nodeblog',
    maxAge: 2592000000,
  },
  mongodb: 'mongodb\://localhost:27017/nodeblog' // :一定要转义
  // mongodb:'mongodb\://tujiaw:123456@ds133428.mlab.com:33428/tujiawblog'
};

// 1.安装mondb
// 2.mongod启动(浏览器上输入：http://localhost:27017/，显示：It looks like you are trying to access MongoDB over HTTP on the native driver port.)
// 3.mongo进入数据库操作，创建nodeblog集合
// 4.use nodeblog
// 5.db.createCollection('user')
// 6.最后npm start才能成功