app.service('service', function(){
  
  var beers = [
  {
  	name: "Alexander Keith's",
  	style: "IPA",
  	abv: "AK",
  	image: "https://c1.staticflickr.com/9/8466/8140544321_75da7d4171.jpg"
  },
  {
    name: "Alexander Keith's",
    style: "IPA",
    abv: "AK",
    image: "https://c1.staticflickr.com/9/8466/8140544321_75da7d4171.jpg"
  },
  {
    name: "Alexander Keith's",
    style: "IPA",
    abv: "AK",
    image: "https://c1.staticflickr.com/9/8466/8140544321_75da7d4171.jpg"
  }
  ];



  return { 
    beers: beers
  };
});