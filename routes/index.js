var express = require('express');
var router = express.Router();

//Get Home Page
router.get('/', function(req, res){
    res.render('index');
});

router.get('/about', function(req, res){
    res.render('about');
});



module.exports = router;

