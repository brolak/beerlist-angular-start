app.controller('mainController', function($scope,service) {
	
  //'import' functions from service
  	$scope.beers = service.beers;
    $scope.getBeers = service.getBeers;
    $scope.addBeer = service.addBeer;
    $scope.removeBeer = service.removeBeer;
    $scope.addRating = service.addRating;
    $scope.clearForm = service.clearForm;

  //toggle and funciton for sorting beerlist
  	$scope.reverse = false;

    $scope.sortBeers = function () {
      this.reverse = !this.reverse;
    };

  //toggle and function for editing beer list
    $scope.edit = false;

    $scope.editFun = function () {
      $scope.edit = !$scope.edit;
    };

  //initialy render the database beers to the view
    $scope.getBeers();

})