var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://test:test@ds161162.mlab.com:61162/todo');

//Creating a schema-it is like a blue print

var todoSchema = new mongoose.Schema({
item:String

});

//Model
var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app){

app.get('/todo', function(req,res){
//get all the data from the mongodb and pass that data in the view.
Todo.find({},function(err,data){
  if(err) throw err;
  res.render('todo',{todos:data});
});

});

app.post('/todo',urlencodedParser, function(req,res){
// get data from the view and send it to mongodb
var newTodo=Todo(req.body).save(function(err,data){
if(err) throw err;
res.json(data);
  });
});


app.delete('/todo/:item',function(req,res){
// delete the requested item from mongodb
Todo.find({item: req.params.item.replace(/\-/g, "")}).remove(function(err,data){

  if(err) throw err;
  res.json(data);
});
});
};
