var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var ToDo = mongoose.model('ToDo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todos', function(req, res){
	ToDo.find(function(err, posts){
		if(err){return next(err);}

		res.json(posts);
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
