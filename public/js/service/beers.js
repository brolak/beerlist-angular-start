app.service('service', function($http){

  //empty array for holding beers from database
  var beers = [];

  //function for clearing the entry form after submission
  var clearForm = function () {
    this.name = "";
    this.style = "";
    this.abv = "";
    this.rating = "";
    this.image = "";
  };

  // function for calculating the average of the ratings array
  var avgFun = function (arr) {
      for(i=0,total=0;i<arr.length;i++){
        total += arr[i];
      }
      return (total/arr.length).toFixed(1);
  };

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
      abv: this.abv,
      rating: [Number(this.rating)],
      avgRating: Number(this.rating),
      image: this.image
    }

    return $http.post('/beers',newBeer)
      .then(function(response) {
        clearForm();
        getBeers();
      }, function (err) {
        console.log(err)
      })
  };

  //function for removing beer from list based on _id in databse and re-render view
  var removeBeer = function () {
    return $http.delete('/beers/'+(this.beer._id))
    .then(function(response) {
      getBeers();
    }, function (err) {
      console.log(err)
    })
  };

  //function for adding new rating to specific beer
  var addRating = function () {
    var newRating = Number(this.userRating);
    this.userRating = "";
    return $http.get('/beers/rating/'+this.beer._id/*, newRating*/)
      .then(function(response) {
        console.log(response.data);
        //getBeers();
      }, function (err) {
        console.log(err)
      })
      
  };

  //exporting functions to the controller
  return { 
    beers: beers,
    clearForm: clearForm,
    getBeers: getBeers,
    addBeer: addBeer,
    removeBeer: removeBeer,
    addRating: addRating
  };
});