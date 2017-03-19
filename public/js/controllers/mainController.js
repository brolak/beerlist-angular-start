app.controller('mainController', function($scope,service) {
	
  //'import' functions from service
  	$scope.beers = service.beers;
    $scope.getBeers = service.getBeers;
    $scope.addBeer = service.addBeer;
    $scope.removeBeer = service.removeBeer;
    $scope.addRating = service.addRating;
    $scope.clearForm = service.clearForm;
    $scope.updateBeer = service.updateBeer;

  //toggle and funciton for sorting beerlist
  	$scope.reverse = false;

    $scope.sortBeers = function () {
      $scope.reverse = !$scope.reverse;
    };

  //toggle and function for editing beer list
    $scope.edit = false;

    // function for calculating the average of the ratings array
    $scope.avgFun = function (arr) {
    for(i=0,total=0;i<arr.length;i++){
        total += arr[i];
      }
    return (total/arr.length).toFixed(1);
    };

  //initialy render the database beers to the view
    $scope.getBeers();

})