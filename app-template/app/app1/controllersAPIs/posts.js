var Posts  = require('../models/Posts');

// showAll  = new Function(['params' , 'callback'] , "Posts.getAll(function(e , r){callback({posts:r});});").bind(this);

exports.showAll  = function(params , callback)
{
	Posts.getAll(function(e , r){
		callback({posts:r});
	});
}


exports.newPost  = function(params , callback)
{
	Posts.newPost(params , function(e , r){
		callback(r);
	});
}


 