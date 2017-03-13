app.controller('mainController', function($scope,service) {
	
  //'import' functions from service
  	$scope.beers = service.beers;
    $scope.getBeers = service.getBeers;
    $scope.addBeer = service.addBeer;
    $scope.removeBeer = service.removeBeer;
    $scope.addRating = service.addRating;
    $scope.clearForm = service.clearForm;
    $scope.newAvg = service.newAvg;
    $scope.updateBeer = service.updateBeer;

  //toggle and funciton for sorting beerlist
  	$scope.reverse = false;

    $scope.sortBeers = function () {
      $scope.reverse = !$scope.reverse;
    };

  //toggle and function for editing beer list
    $scope.edit = false;

  //initialy render the database beers to the view
    $scope.getBeers();

})