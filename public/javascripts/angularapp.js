var app = angular.module('toDo',['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainController',
      resolve: {
	    postPromise: ['todos', function(todos){
	      return todos.getAll();
	    }]
	  }
    });

  $urlRouterProvider.otherwise('home');
}]);


app.factory('todos', ['$http', function($http){
	var o = {
		todos:[]
	};
	o.getAll = function() {
		return $http.get('/todos').success(function(data){
			angular.copy(data, o.todos);
		});
	};
	o.create = function(todo) {
		return $http.post('/todos', todo).success(function(data){
			o.todos.push(data);
		});
	};
  return o;
}]);

app.controller('MainController', ['$scope', 'todos', function($scope, todos){
	$scope.todos = todos.todos;

	$scope.addTodo = function(){
		if(!$scope.todoname || $scope.todoname ==='') { return;  }
		todos.create({
			todoname: $scope.todoname
		});
		$scope.todoname = '';
	}
}])
