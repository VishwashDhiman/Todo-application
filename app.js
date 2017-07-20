var express = require('express');

var todoController = require('./controllers/todoController');


//Setting up Express
var app = express();

//Setting up the template engine
app.set('view engine','ejs');

//Static files
app.use('/assets', express.static('assets'));

//Fire controllers

todoController(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');
