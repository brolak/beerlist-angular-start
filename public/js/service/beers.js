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

  //function for updating edited beer info to db
  var updateBeer = function () {
    if(this.edit === true){
      var editBeer = {
        name: this.beer.name,
        abv: this.beer.abv,
        style: this.beer.style,
        _id: this.beer._id
      };

      $http.post('/beers/'+this.beer._id+'/update', editBeer)
      .then(function(response) {
      	var updateIndex = beers.findIndex(beer => beer._id == response.data._id);
      	console.log(beers[updateIndex]);
      	//beers[updateIndex].name = editBeer.name;
      	//beers[updateIndex].abv = editBeer.abv;
      	//beers[updateIndex].style = editBeer.style;
      }, function (err) {
        console.log(err)
      })
    }
    this.edit = !this.edit;
  };

  //exporting functions to the controller
  return { 
    beers: beers,
    getBeers: getBeers,
    addBeer: addBeer,
    removeBeer: removeBeer,
    addRating: addRating,
    updateBeer: updateBeer
  };
});