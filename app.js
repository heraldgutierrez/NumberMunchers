
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var sass = require('node-sass');

// routes
var routes = require('./routes');

// all environments
app.configure(function() {
	app.set('port', process.env.PORT || 5000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	app.use(
		sass.middleware({
			src: __dirname + '/public/sass',
			dest: __dirname + '/public',
			debug: true
		})
	);

	app.use(express.favicon(path.join(__dirname, 'favicon.ico')));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(app.router);

	// Error
	app.use(function(req, res, next){
		res.status(404);

		// respond with html page
		if (req.accepts('html')) {
			res.render('404', { 
				url: req.url 
			});
			return;
		}

		// respond with json
		if (req.accepts('json')) {
			res.send({ error: 'Not found' });
			return;
		}

		// default to plain-text. send()
		res.type('txt').send('Not found');
	});
});

// development only
app.configure('development', function() {
	app.use(express.errorHandler());
});



/*********************************************************
**********************************************************
*
*	HTML pages/handlers
*
*********************************************************
*********************************************************/

app.get('/', function(req, res) {
	res.render('index');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
