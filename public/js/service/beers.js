app.service('service', function(){
  
  /*var avgRating = function(arr){
    for(i=0, total=0;i<arr.length;i++){
      var total += arr[i];
    }
    return total/arr.length;
  };*/

  var beers = [
  {
    name: "Molson's Canadian",
    style: "Lager",
    abv: "MOL",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Molson_Canadian.svg/1042px-Molson_Canadian.svg.png",
    rating: 3
  },
  {
    name: "Moosehead",
    style: "Moose piss",
    abv: "MH",
    image: "http://moosehead.ca/wp-content/uploads/2015/10/cropped-moosehead_logo-180x180.png",
    rating: 2
  },
  {
    name: "Alexander Keith's",
    style: "IPA",
    abv: "AK",
    image: "https://c1.staticflickr.com/9/8466/8140544321_75da7d4171.jpg",
    rating: 5
  },
  {
    name: "Coor's",
    style: "Light Lager",
    abv: "Coors",
    image: "http://vignette3.wikia.nocookie.net/itsalwayssunny/images/b/bd/Coors_Light_Logo.jpg/revision/latest?cb=20110903221221",
    rating: 2
  }
  ];



  return { 
    beers: beers
  };
});