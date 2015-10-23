var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var ToDo = mongoose.model('ToDo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.param('todo', function(req, res, next, id){
	var query = ToDo.findById(id);

	query.exec(function(err, todo){
		if(err) { return next(err); }
		if (!todo) { return next(new Error('can\'t find post')); }

		req.todo = todo;
		return next();
	});
});
router.get('/todos/:todo', function(req, res){
	res.json(req.todo);
});
router.get('/todos', function(req, res){
	ToDo.find(function(err, todos){
		if(err){return next(err);}

		res.json(todos);
	});
});
router.post('/todos', function(req, res, next){
	
	var todo = new ToDo(req.body);
	console.log(req.body.todoname);

	todo.save(function(err, todo){
		if(err) { return next(err); }
		res.json(todo);
	});
});

router.get('/todos', function(req, res, next){
	
});

module.exports = router;
