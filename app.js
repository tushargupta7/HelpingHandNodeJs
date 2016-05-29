var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var addchild = require('./routes/addchild');
var childrenlist = require('./routes/childrenlist');
var requirements= require('./routes/getrequirements');
var login = require('./routes/login');
var verify = require('./routes/verify');
var orphanage=require('./routes/addOrphanage');
var orphanageList=require('./routes/orphanagelist');
var addproduct=require('./routes/addproduct');
var orphrequirement=require('./routes/AddOrphanageRequirement');
var app = express();

var mongoose = require('mongoose');
try {
  var mongodbUri = 'mongodb://tushargupta7:jerrymouse@ds015720.mlab.com:15720/helpinghand';

  mongoose.connect(mongodbUri);
  var db = mongoose.connection;
  db.on('connected', function(){console.log("now connected")});
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.info('connected to database')
  });
}
catch(err){
  console.log(err.message);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/addchild', addchild);
app.use('/childrenlist', childrenlist);
app.use('/login', login);
app.use('/verify', verify);
app.use('/addOrphanage',orphanage);
app.use('/orphanagelist',orphanageList);
app.use('/getrequirements',requirements);
app.use('/addproduct',addproduct);
app.use('/addorphanagerequirement',orphrequirement);
// error handlers


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
