// initialize the sub application.
//the module should be called from the mian app.js 

var glob = require('glob');
var path = require('path');
var express = require('express');

function loadRoutes(routeList , app)
{
	routeList.forEach(function (route) {
	   	route.type = route.type || 'get';
	   	app[route.type]( route.route,  function(req , res){
	   		if(route.fn)
	   		{
	   			route.fn( _.extend({}, req.query , req.body , req.params , (req.internalParams||{}) ), function(apiData){
		   			if(route.view)
		   				res.render( path.join(__dirname, 'views/' + route.view)   , apiData)
		   			else
		   				res.send(apiData);
		   		});
	   		}
	   		else if(route.view)
	   		{
	   			res.render(route.view)
	   		}
	   		else
	   		{
	   			res.send('Error in the route definition :\'(');
	   		}

	   	});
	});
}

module.exports = function(app)
{

	app.use(express.static(path.join(__dirname, 'public')));// set public folder

	// load all the routs
	var routes = glob.sync( path.join(__dirname, 'routes/*.js') );

	routes.forEach(function (routeList) {
	    routeList = require(routeList);
	    if(routeList.routesList)
	    	loadRoutes(routeList.routesList , app);

	    if(routeList.router)
	    	app.use('/', routeList.router);

	});




}