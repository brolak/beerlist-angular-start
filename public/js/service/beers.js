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
      image: this.image
    };

    this.name = "";
    this.style = "";
    this.abv = "";
    this.rating = "";
    this.image = "";

    return $http.put('/beers',newBeer)
      .then(function(response) {
        beers.push(response.data);
      }, function (err) {
        console.log(err)
      })
  };

  //function for removing beer from list based on _id in databse and re-render view
  var removeBeer = function (beerId) {
    return $http.delete('/beers/'+beerId)
    .then(function(response) {
      var removeIndex = beers.findIndex(beer => beer._id == response.data);
      beers.splice(removeIndex,1);
    }, function (err) {
      console.log(err)
    })
  };

  //function for adding new rating to specific beer to db
  var addRating = function (id,rating) {
    var newRating = { rating : Number(rating)};
    this.userRating = "";
    return $http.put('/beers/'+id+'/rating', newRating)
      .then(function(response) {
      	var ratingIndex = beers.findIndex(beer => beer._id == response.data);
      	beers[ratingIndex].rating.push(newRating.rating);
      }, function (err) {
        console.log(err)
      })   
  };

//array for temporarily storing beers that are being updated
  var tempBeers = [];

//var for storing old beer information incase update fails

  var oldBeer = {};

  //function for updating edited beer info to db
  var updateBeer = function (updatedBeer, updateIndex, oldInfo) {
  	//get rid of the NEW temporary beer info
      tempBeers[updateIndex] = null;
     //send info to database
      $http.post('/beers/'+updatedBeer._id+'/update', updatedBeer)
      .then(function(response) {
      }, function (err) {
     //upon fail, set beer's info back to oldBeer (old info)
     	alert("update failed!");
      	beers[updateIndex] = angular.copy(oldInfo);
        console.log(err);
      })
  };

  //exporting functions to the controller
  return { 
    beers: beers,
    getBeers: getBeers,
    addBeer: addBeer,
    removeBeer: removeBeer,
    addRating: addRating,
    updateBeer: updateBeer,
    tempBeers: tempBeers,
    oldBeer: oldBeer
  };
});