var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var beerSchema = new Schema ({
	name: String,
	abv: Number,
    style: String,
    image: String,
    rating: [Number],
    avgRating: Number
}, {versionKey: false});

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
