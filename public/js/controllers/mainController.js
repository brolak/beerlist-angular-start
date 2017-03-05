app.controller('mainController', function($scope,service) {
	//define variable in scope of controller
  	$scope.beers = service.beers;

  	console.log($scope.beers);

	/*$scope.iconSwitch = function () {
		this.delete = !this.delete;
		this.removal = !this.removal;
	}
	
	$scope.addBeer = function () {
	
	};

	$scope.remove = function () {
		this.collection.splice(this.$index,1);
	}*/
})