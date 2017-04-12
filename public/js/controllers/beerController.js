app.controller('beerController', function($scope,$stateParams,service) {
	$scope.getBeer = service.getBeer;

	if (!$stateParams.beerParam) {
    service.getBeer($stateParams.id)
    .then(function(beer) {
        $scope.beer = beer;
      })
  	} else {
    $scope.beer = $stateParams.beerParam;
  	}
})