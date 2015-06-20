
var path = require('path');
var express = require('express');
var router = express.Router();

var postsAPI = require('../controllersAPIs/posts');

exports.routesList  = [
    {route: '/',  fn: postsAPI.showAll , type : 'get'  },
    {route: '/new',  fn: postsAPI.newPost , type : 'post' },
    {route: '/profile',  fn: function(params , cb){cb(params)} , type : 'get' },
   
];


router.get('/popo', function (req, res, next) {
  res.send('pompom');
});


exports.router = router;



