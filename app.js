
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

//GLOBAL VARIABLE 
//NOTE: this is bad practice, but we'll use it for prototyping purposes
users   = {};
users[0]  = {uid: 0, name: 'George', type: "none"};
users[1]  = {uid: 1, name: 'John',   type: "none"};
users[2]  = {uid: 2, name: 'Jimmy', type: "none"};
users[3]  = {uid: 3, name: 'chris', type: "none"};

//index = uid (user id) 
//route_request stores the leg array of what GoogleMap Direction API returns
route_request = {};
riders  = {};

var d_routes = require('./routes/drivers/routes');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/debug', function(req,res){
    res.send(users);
});

app.get('/', function(req,res){
    res.render('index', { title: 'GreenRoad Prototype' });
}); 
//app.get('/users', user.list);

//DRIVERS ROUTES API
app.get('/drivers/routes/:route_id', d_routes.show);
app.post('/drivers/routes', d_routes.create);
app.put('/drivers/routes/:route_id', d_routes.update);


//USERS API
app.get('/users', function(req,res){
    console.log("yes");
    res.send(users);
});

app.get('/users/:id', function(req, res){
    console.log(req.params.id);
    if(!users[req.params.id]){
        res.send({'error': "user doesn't exists"});
    }else{
        res.send(users[req.params.id]);
    }
});

//END




http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
