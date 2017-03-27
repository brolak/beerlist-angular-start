app.controller('authController', function($scope,authFactory,$state) {
	$scope.register = function(){ 
		authFactory.register($scope.user)
		.then(function(response) {
			authFactory.currentUser.username = response.data;
			console.log(authFactory.currentUser.username);
        	$state.go('home');
      	}, function(err) {
        	alert(err.data.message);
      	});
	}

	$scope.login = function () {
		authFactory.login($scope.user)
		.then(function(){
			$state.go('home');
		}, function(err){
			alert(err.data);
		})
	}

})