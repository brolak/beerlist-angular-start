app.controller('authController', function($scope,authFactory) {

	$scope.register = function(){ 
		authFactory.register($scope.user)
	}

	$scope.login = function () {
		authFactory.login($scope.user)	
	}

})