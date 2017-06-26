let username;
let password;

const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');

const data = require('./data.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');

app.get('/', function(req, res){
  if (req.session && req.session.authenticated){
    // res.render('index');
    res.send("You have successfully logged in under the username: " + username);
  } else {
    res.redirect('/login/');
  }
});

app.post('/', function(req, res){
  res.redirect('/login/');
});

app.get('/login/', function(req, res){
  res.render('login');
});

app.post('/login/', function(req, res){
  username = req.body.username;
  password = req.body.password;

  if (data.authenticate(req, username, password)){
    res.redirect('/');
  } else{
    res.render('index');
  }
});

app.listen(3000, function () {
  console.log('Successfully started express application!');
});
