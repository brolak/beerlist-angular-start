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

  //function for getting single beer information (review ui)
  var getBeer = function (id) {
    return $http.get('/beer/'+id)
    .then(function(response) {
      return response.data;
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
    beers.push(newBeer);

    return $http.put('/beers',newBeer)
      .then(function(response) {
        angular.copy(response.data, beers[beers.length-1])
      }, function (err) {
        this.beers.pop();
        console.log(err)
      })
  };

  //function for removing beer from list based on _id in database and re-render view
  var removeBeer = function (removeBeer) {
    var removeIndex = beers.findIndex(beer => beer._id == removeBeer._id);
    beers.splice(removeIndex,1);
    return $http.delete('/beers/'+removeBeer._id)
    .then(function(response) {
    }, function (err) {
      beers.push(removeBeer);
      console.log(err)
    })
  };

  //function for adding new rating to specific beer to db
  var addRating = function (id,rating) {
    var newRating = { rating : Number(rating)};
    this.userRating = "";
    var ratingIndex = beers.findIndex(beer => beer._id == id);
    beers[ratingIndex].rating.push(newRating.rating);
    return $http.put('/beers/'+id+'/rating', newRating)
      .then(function(response) {
      }, function (err) {
      	alert("your rating did not update");
      	beers[ratingIndex].rating.pop();
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
      	angular.copy(oldInfo, beers[updateIndex]);
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
    oldBeer: oldBeer,
    getBeer: getBeer
  };
});