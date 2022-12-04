var express = require('express');
var router = express.Router();


router.get('/login', function(req, res){
    res.render('login');
});







/*
//Get dashboard Page
router.get('/dashboard', ensureAuthenticated, function(req, res){
    res.render('dashboard');
});


//Get Suppliers List Page
router.get('/supplierList', ensureAuthenticated, function(req, res){
    res.render('supplierlist');
});



function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error_msg','You are not logged in.');
        res.redirect('/users/login');
    }
}

*/

module.exports = router;


