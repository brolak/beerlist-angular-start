app.controller('mainController', function($scope,service) {
	//define variable in scope of controller
  	$scope.beers = service.beers;
  	$scope.addBeer = service.addBeer;

  	$scope.addBeer = function () {
	    var newBeer = {
	      name: this.beerName,
	      style: this.beerStyle,
	      abv: this.beerAbv,
	      image: this.beerImage
	    }

	    this.beers.push(newBeer);
	    this.beerName="";
	    this.beerStyle="";
	    this.beerAbv="";
	    this.beerImage="";
  	}

	/*$scope.iconSwitch = function () {
		this.delete = !this.delete;
		this.removal = !this.removal;
	}
	};

	$scope.remove = function () {
		this.collection.splice(this.$index,1);
	}*/
})