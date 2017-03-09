app.controller('mainController', function($scope,service) {
	//define variable in scope of controller
  	$scope.beers = service.beers;
    $scope.getBeers = service.getBeers;
    $scope.addBeer = service.addBeer;
    $scope.removeBeer = service.removeBeer;

  	$scope.reverse = false;

    $scope.edit = false;

    $scope.editFun = function () {
      $scope.edit = !$scope.edit;
    }

  	$scope.avgFun = function (arr) {
      for(i=0,total=0;i<arr.length;i++){
        total += arr[i];
      }
      return (total/arr.length).toFixed(1);
  	};


  	$scope.sortBeers = function () {
  		this.reverse = !this.reverse;
  	}

  	$scope.addRating = function () {
  		//alert(this.beer[this.$index].ratings);
  		/*this.beer.rating.push(Number(this.userRating));
  		this.userRating = "";*/
  	}

    $scope.getBeers();

})