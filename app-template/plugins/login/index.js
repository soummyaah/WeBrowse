
exports.isLoggedIn = function(req , callback){
	callback(req.isAuthenticated());
}

export.getUserDetails = function(req , callback){
	callback(req.user);
}