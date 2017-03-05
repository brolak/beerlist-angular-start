app.controller('mainController', function($scope,service) {
	//define variable in scope of controller
  	$scope.beers = service.beers;

  	$scope.reverse = false;

  	$scope.avgFun = function (arr) {
      for(i=0,total=0;i<arr.length;i++){
        total += arr[i];
      }
      return (total/arr.length).toFixed(1);
  	};

  	$scope.addBeer = function () {
	    var newBeer = {
	      name: this.name,
	      style: this.style,
	      abv: this.abv,
	      rating: [this.rating],
	      image: this.image
	    }

	    this.beers.push(newBeer);
	    this.name="";
	    this.style="";
	    this.abv="";
	    this.image="";
	    this.rating="";
  	}

  	$scope.removeBeer = function () {
  		this.beers.splice(this.$index,1);
  	}


  	$scope.sortBeers = function () {
  		this.reverse = !this.reverse;
  	}

  	$scope.addRating = function () {
  		//alert(this.beer[this.$index].ratings);
  		this.beer.rating.push(Number(this.userRating));
  		this.userRating = "";
  	}

})