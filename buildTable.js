var AV = require('leancloud-storage');
var APP_ID = "97EYKfMN2Tvguso9HbXLbaaq-gzGzoHsz";
var APP_KEY = "RGQmBKaGRNNjneKu6nV5hODE";


AV.init({
    appId: APP_ID,
    appKey:APP_KEY
})
var SongObject = AV.Object.extend('Song');//选择表名
var songObject = new SongObject();//生成一条数据
// songObject.save({
//   name:"绅士",//数据的内容
//   singer:'薛之谦',
//   url:"http://ovek3v2i1.bkt.clouddn.com/%E7%BB%85%E5%A3%AB.mp3"
// }).then(function(object) {
//   console.log('保存成功');
// })
// songObject.save({
//   name:"丑八怪",//数据的内容
//   singer:'薛之谦',
//   url:"http://ovek3v2i1.bkt.clouddn.com/%E4%B8%91%E5%85%AB%E6%80%AA.mp3"
// }).then(function(object) {
//   console.log('保存成功');
// })
// songObject.save({
//   name:"演员",//数据的内容
//   singer:'薛之谦',
//   url:"http://ovek3v2i1.bkt.clouddn.com/%E6%BC%94%E5%91%98.mp3"
// }).then(function(object) {
//   console.log('保存成功');
// })
// songObject.save({
//   name:"暧昧",//数据的内容
//   singer:'薛之谦',
//   url:"http://ovek3v2i1.bkt.clouddn.com/%E6%9A%A7%E6%98%A7.mp3"
// }).then(function(object) {
//   console.log('保存成功');
// })
// songObject.save({
//   name:"意外",//数据的内容
//   singer:'薛之谦',
//   url:"http://ovek3v2i1.bkt.clouddn.com/%E6%84%8F%E5%A4%96.mp3"
// }).then(function(object) {
//   console.log('保存成功');
// })