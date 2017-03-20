var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new Schema ({
	name: String,
	comment: String
}, {versionKey: false});

var beerSchema = new Schema ({
	name: String,
	abv: Number,
    style: String,
    image: String,
    rating: [Number],
    reviews: [reviewSchema]
}, {versionKey: false});

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;

