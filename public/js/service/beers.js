app.service('service', function($http){

  //empty array for holding beers from database
  var beers = [];

  //function for GETting beers from data base and putting in beer array
  var getBeers = function () {
    return $http.get('/beers')
    .then(function(response) {
      angular.copy(response.data, beers);
    }, function (err) {
      console.log(err)
    })
  };

  //function for adding beer from form info to database and re-rendering view
  var addBeer = function () {
    var newBeer = {
      name: this.name,
      style: this.style,
      abv: Number(this.abv),
      rating: [Number(this.rating)],
      avgRating: Number(this.rating),
      image: this.image
    };

    this.name = "";
    this.style = "";
    this.abv = "";
    this.rating = "";
    this.image = "";

    return $http.put('/beers',newBeer)
      .then(function(response) {
        getBeers();
      }, function (err) {
        console.log(err)
      })
  };

  //function for removing beer from list based on _id in databse and re-render view
  var removeBeer = function () {
    return $http.delete('/beers/'+this.beer._id)
    .then(function(response) {
      getBeers();
    }, function (err) {
      console.log(err)
    })
  };

  // function for calculating the average of the ratings array
  var avgFun = function (arr) {
    for(i=0,total=0;i<arr.length;i++){
        total += arr[i];
      }
    return (total/arr.length).toFixed(1);
  };

  //function for adding new average of rating array
  var newAvg = function (beer) {
    var newAverage = { avgRating : avgFun(beer.rating)};
    return $http.post('/rating/'+beer._id, newAverage)
      .then(function(response) {
        getBeers();
      }, function (err) {
        console.log(err)
      })
  };

  //function for adding new rating to specific beer
  var addRating = function () {
    var newRating = { rating : Number(this.userRating)};
    this.userRating = "";
    return $http.put('/rating/'+this.beer._id, newRating)
      .then(function(response) {
        newAvg(response.data);
      }, function (err) {
        console.log(err)
      })
      
  };

  //exporting functions to the controller
  return { 
    beers: beers,
    getBeers: getBeers,
    addBeer: addBeer,
    removeBeer: removeBeer,
    addRating: addRating,
    newAvg: newAvg
  };
});