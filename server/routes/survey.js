var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');

var Survey = require('../models/survey');


/* check if user is authenticatd */
function requireAuth(req, res, next){
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}




/////////////////////

/* Render the Add businesscontact Page */
router.get('/educational/create', requireAuth, function (req, res, next) {
    res.render('educational/create', {
        //title: 'create',
        //displayName: req.businesscontacts ? req.businesscontacts.displayName : ''
    });
});


module.exports = router;
