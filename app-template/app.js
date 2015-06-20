// modules  
var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var lusca = require('lusca');
var methodOverride = require('method-override');
var multer  = require('multer');
var mongoose = require('mongoose');
var glob = require('glob');

var appConfig = require('./config/app');
var globalIncludes = require('./config/global-include')

// include global modules
for(moduleName in globalIncludes)
{
	GLOBAL[globalIncludes[moduleName]] = require(moduleName);
}

// init the app
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('port', process.env.PORT || appConfig.port);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('my#secret#here111'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ dest: path.join(__dirname, appConfig.uploadsFolder) }));
app.use(methodOverride());
app.use(session());

//  security
app.use(lusca({
  csrf: false,
  xframe: 'SAMEORIGIN',
  xssProtection: true
}));

//connect to db
mongoose.connect(appConfig.mongo.dbUrl);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});


// load all the plugins
var pluginInitializers = glob.sync( path.join(__dirname, './plugins/*/init.js') );  
pluginInitializers.forEach(function (initializer) {
    require(initializer)(app);
});



// now load all the apps
var appInitializers = glob.sync( path.join(__dirname, './app/*/init.js') );  
appInitializers.forEach(function (initializer) {
    require(initializer)(app);
});




app.use(errorHandler());
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;

