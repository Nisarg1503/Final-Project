//Import mongoose bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//need an alias for mongoose.Schema
var Schema = mongoose.Schema;

//Define our user Schema
var SurveySchema = new Schema({
	"username" : String,
	"email" : String,
	"title" : String,
	"surveys" : [{
		"question" : String,
		"answers" : []}
	],
	"updated" : {
		"type" : Date,
		"default" : +new Date
	}
}, {
	"collection" : "survey"
});



module.exports = mongoose.model('Survey', SurveySchema);