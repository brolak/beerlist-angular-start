app.service('service', function(){

  var beers = [
  {
    name: "Molson's Canadian",
    style: "Lager",
    abv: "MOL",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Molson_Canadian.svg/1042px-Molson_Canadian.svg.png",
    rating: [1,2]
  },
  {
    name: "Moosehead",
    style: "Moose piss",
    abv: "MH",
    image: "http://moosehead.ca/wp-content/uploads/2015/10/cropped-moosehead_logo-180x180.png",
    rating: [3]
  },
  {
    name: "Alexander Keith's",
    style: "IPA",
    abv: "AK",
    image: "https://c1.staticflickr.com/9/8466/8140544321_75da7d4171.jpg",
    rating: [4]

  },
  {
    name: "Coor's",
    style: "Light Lager",
    abv: "Coors",
    image: "http://vignette3.wikia.nocookie.net/itsalwayssunny/images/b/bd/Coors_Light_Logo.jpg/revision/latest?cb=20110903221221",
    rating: [5]

  }
  ];

  return { 
    beers: beers
  };
});