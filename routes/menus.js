var express = require('express');
var router = express.Router();


//Get Masters menus
router.get('/menuMasters', function(req, res){
    if (req.isAuthenticated()) {
        res.render('menuMasters');
    } else {
    	res.render('noaccess');
    }
});

router.get('/GrpMast', function(req, res){
    if (req.isAuthenticated()) {
        res.render('../groups');
    } else {
    	res.render('noaccess');
    }
});

//Get Transactions menus
router.get('/menuTrans', function(req, res){
    if (req.isAuthenticated()) {
        res.render('menuTrans');
    } else {
    	res.render('noaccess');
    }
});


//Get Integrations menus
router.get('/menuIntegration', function(req, res){
    if (req.isAuthenticated()) {
        res.render('menuIntegration');
    } else {
    	res.render('noaccess');
    }
});

//Get Reports menus
router.get('/menuReports', function(req, res){
    if (req.isAuthenticated()) {
        res.render('menuReports');
    } else {
    	res.render('noaccess');
    }
});

//Get Reports menus
router.get('/menuSetting', function(req, res){
    if (req.isAuthenticated()) {
        res.render('menuSetting');
    } else {
    	res.render('noaccess');
    }

});

router.get('/users/login', function(req, res){
    res.render('login');
});



module.exports = router;


