var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var decode = require('salesforce-signed-request');
var ejs = require('ejs');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var cryptojs = require("crypto-js");
var crypto = require('crypto');
algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';
// app.use(allowCrossDomain);
// view engine setup
app.set('views', path.join(__dirname, 'html'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);
// app.use(express.static(path.join(__dirname, 'html')));
// var html_dir = './html/';

// app.get('/sf',function(req,res){
    
//     res.render('index');
//     // res.sendfile(html_dir + 'index.ejs');
//  // res.sendFile(path.join(__dirname, '../canvas_example', 'index.html'));
// });

// app.get('/',function(req,res){

//    console.log('Signed Request =' +req.body.signed_request);
//    res.json("Hello world");
// });

// app.get('/canvas/callback/',function(req,res){
   
//    console.log(req.body);
//    console.log('Signed Request =' +req.body.signed_request);
//    res.render('index',{sr:req.body.signed_request});
// });


app.get('/',function(req,res){
   
   res.render('index',{signedRequestJson:req.body.signed_request});
});

app.post('/canvas/callback/',function(req,res){
   
   res.render('index',{signedRequestJson:req.body.signed_request});

});

app.post('/decrypt',function(req,res){

   console.log('body: ' + JSON.stringify(req.body.apikey));
   
   var decrypted = cryptojs.AES.decrypt(req.body.apikey, "mGfcZiv54O/72cZ2A0dFl3mkL0NVhGtPUnMyFau3kZk=");
    res.send(decrypted);

});


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


module.exports = app;
