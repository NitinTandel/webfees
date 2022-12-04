var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
var config = require( '/webfees/config');
//var config = require( __dirname + '/config');


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
      var rtnval =  "Authetication Failed !";
//      console.log(rtnval);
      res.json({"message" : rtnval});
    }
}


router.post('/EXEC', function(req, res, next)  {
    const postparms = {
        p1: req.body.cmdType,
        p2: req.body.sqlStmt
    };
//  console.log(postparms);  
  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
  if (err) {
      res.json(err.message) ;
    } 
      if (postparms.p1 === "SELECT") {
        let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
        if (err) {
            res.json(err.message) ; 
          } 
            db.all(postparms.p2, [], function(err, rows)  {
                if (err) {
                  res.json(err.message);
                } else {
                  res.json(rows); 
                }
            });
        });
      } else if (postparms.p1 === "UPDATE") {
        db.run(postparms.p2, [], function(err, row){
            if (err){
                res.status(500).json(err.message);
            } else {
                res.status(202).json({"message" : "updated"});
            }
            res.end();
        });
      } else if (postparms.p1 === "DELETE") {
        db.run(postparms.p2, [], function(err, row){
            if (err){
                res.status(500).json(err.message);
            } else {
                res.status(202).json({"message" : "deleted"});
            }
            res.end();
        });
      } else if (postparms.p1 === "INSERT") {
        db.run(postparms.p2, [], function(err, row){
            if (err){
                res.status(500).json(err.message);
            } else {
                res.status(202).json({"message" : "Inserted"});
            }
            res.end();
        });
      } else { 
        res.status(202).json({"message" : "Invalid params"});
      }
    });
    db.close();
});


module.exports = router;

