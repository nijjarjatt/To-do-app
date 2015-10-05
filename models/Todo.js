var mongoose = require('mongoose');

var ToDoSchema = new mongoose.Schema({
	todoname: String
});

mongoose.model('ToDo', ToDoSchema);