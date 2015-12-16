//import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema; // Schema object


var BusinessSchema = new Schema({
	name: String,
	phone: String,
	email: String,
	created: {
        type: Date,
        default: Date.now
    },
	updated: Date
}, {
	collection: 'businessContact'
});

module.exports = mongoose.model('Businesscontact', BusinessSchema);


