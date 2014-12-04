var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var decode = require('salesforce-signed-request');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use(express.static(path.join(__dirname, 'html')));
var html_dir = './html/';
app.use(express.static(path.join(__dirname, 'html')));

app.get('/sf',function(req,res){

    res.sendfile(html_dir + 'index.html');
 // res.sendFile(path.join(__dirname, '../canvas_example', 'index.html'));
});


app.get('/canvas/callback/',function(req,res){

    console.log(res);

   res.sendfile(html_dir + 'index.html');

    var json = decode('YOUR_SIGNED_REQUEST', 'API_SECRET');

    console.log(json);

 // res.sendFile(path.join(__dirname, '../canvas_example', 'index.html'));
});

app.post('https://thingtech.ap1.visual.force.com/services/data/v32.0/platformconnect/traceevent',function(req,res){
alert("POSTING");

})

app.put('/',function(req,res){
    alert('HELLO');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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
