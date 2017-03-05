app.controller('mainController', function($scope,service) {
	//define variable in scope of controller
  	$scope.beers = service.beers;

  	$scope.reverse = false;

  	$scope.addBeer = function () {
	    var newBeer = {
	      name: this.beerName,
	      style: this.beerStyle,
	      abv: this.beerAbv,
	      rating: this.beerRating,
	      image: this.beerImage
	    }

	    this.beers.push(newBeer);
	    this.beerName="";
	    this.beerStyle="";
	    this.beerAbv="";
	    this.beerImage="";
	    this.beerRating="";
  	}

  	$scope.removeBeer = function () {
  		console.log(this.beers);
  		console.log(this.$index);
  		this.beers.splice(this.$index,1);
  	}


  	$scope.sortBeers = function () {
  		this.reverse = !this.reverse;

  	}

})