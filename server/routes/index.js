var express = require('express');
var router = express.Router();
var passport = require('passport');

var mongoose = require('mongoose');
var Survey = require('../models/survey');

/* Utility functin to check if page is authenticate */
function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  next();
}

//////////----
/* Render home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/about');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/survey',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/users',
    failureRedirect : '/register',
    failureFlash : true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});


/* Getting about us page */
router.get('/about', function(req, res, next) {
   res.render('about', {
        title: 'about',
        displayName: req.user ? req.user.displayName : '' });
});


/* Getting survey page */
router.get('/survey', function(req, res, next) {
   res.render('survey', {
        title: 'survey',
        displayName: req.user ? req.user.displayName : '' });
});


/* Getting contact page */
router.get('/contact', function(req, res, next) {
   res.render('contact', {
        title: 'contact',
        displayName: req.user ? req.user.displayName : '' });
});


/*Survey Pages*/

/* Render the survey create Page */
router.get('/educational/create', requireAuth, function (req, res, next) {
    res.render('educational/create', {
        title: 'create',
        //displayName: req.businesscontacts ? req.businesscontacts.displayName : ''
    });
});



/* Render the survey add Page */
/*
router.get('/educational/add', requireAuth, function (req, res, next) {
    res.render('educational/add', {
        title: 'Questions',
        //displayName: req.businesscontacts ? req.businesscontacts.displayName : ''
    });
});
*/

/* Render the survey choice Page */

router.get('/choice/multiple', requireAuth, function (req, res, next) {
    res.render('choice/multiple', {
        title: 'Multiple',
        //displayName: req.businesscontacts ? req.businesscontacts.displayName : ''
    });
});


/* process the submission of a new user */
router.post('/choice/multiple', requireAuth, function (req, res, next) {
    var survey = new Survey(req.body);

    survey.create({
        surveyname: req.body.surveyName,
        surveyQues: req.body.surveyQues,
        surveyOption1: req.body.surveyOption1,
        surveyOption2: req.body.surveyOption2,
        surveyOption3: req.body.surveyOption3,
        surveyOption4: req.body.surveyOption4,
        created: Date.now(),
        updated: Date.now()
    }, function (err, User) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/educational/create');
        }
    });
});

/* Render the survey choice Page */
router.get('/choice/short', requireAuth, function (req, res, next) {
    res.render('choice/short', {
        title: 'Short Questions',
        //displayName: req.businesscontacts ? req.businesscontacts.displayName : ''
    });
});

/* process the submission of a new user */
router.post('/choice/short', requireAuth, function (req, res, next) {
    var survey = new Survey(req.body);

    survey.create({
        surveyname: req.body.surveyName,
        surveyShort: req.body.surveyShort,
        surveyAns: req.body.surveyAns,
        created: Date.now(),
        updated: Date.now()
    }, function (err, User) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/educational/create');
        }
    });
});

module.exports = router;
