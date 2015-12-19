//Import mongoose bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//need an alias for mongoose.Schema
var Schema = mongoose.Schema;

//Define our user Schema
var SurveySchema = new Schema({
	surveyName: String,
    surveyQues: String,
    surveyOption1: String,
    surveyOption2: String,
    surveyOption3: String,
    surveyOption4: String,
    surveyShort: String,
    surveyAns: String,
    created: Number,
	updated: Number
}, {
	"collection" : "survey"
});



module.exports = mongoose.model('Survey', SurveySchema);