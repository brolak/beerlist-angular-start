app.service('service', function($http){

  var beers = [];

  var getBeers = function () {
    return $http.get('/beers')
    .then(function(response) {
      angular.copy(response.data, beers);
    }, function (err) {
      console.log(err)
    })
  };

  var addBeer = function () {
    var newBeer = {
      name: this.name,
      style: this.style,
      abv: this.abv,
      rating: [Number(this.rating)],
      image: this.image
    }

    return $http.post('/beers',newBeer)
      .then(function(response) {
        this.name = "";
        this.style = "";
        this.abv = "";
        this.rating = "";
        this.image = "";
        getBeers();
      }, function (err) {
        console.log(err)
      })
  };

  var removeBeer = function () {
    return $http.delete('/beers/'+(this.beer._id))
    .then(function(response) {
      getBeers();
    }, function (err) {
      console.log(err)
    })
  };

  return { 
    beers: beers,
    getBeers: getBeers,
    addBeer: addBeer,
    removeBeer: removeBeer
  };
});