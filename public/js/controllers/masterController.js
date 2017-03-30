app.controller('masterController', function($scope, authFactory) {
	
	$scope.currentUser = authFactory.currentUser;
	
	$scope.logout = function () {
		authFactory.logout();
	};

  	authFactory.getCurrentUser();
  	
})