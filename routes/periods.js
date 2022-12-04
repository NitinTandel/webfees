var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
//var config = require('../config');
var config = require( '/webfees/config');


router.get('/', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT * FROM COMPANY", [], (err, rows) => {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows);	
        	}
    	});
	});
    db.close();
});



router.get('/:Id', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT * FROM COMPANY WHERE CO_CODE=" + req.params.Id , [], (err, rows) => {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows);	
        	}
    	});
	});
    db.close();
});



router.delete('/:Id', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
		db.run( "DELETE FROM COMPANY WHERE CO_CODE = " + req.params.Id , [], function(err, row){
		    if (err){
		            res.status(500).json(err.message);
		    } else {
		            res.status(202).json({"message" : "deleted"});
		    }
		     res.end();
		});
	});
    db.close();
});



router.post('/EXEC', (req, res, next) => {
    const postparms = {
        p1: req.body.cmdType,
        p2: req.body.sqlStmt
    };
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ;
    	//res.json({"message":"This is the error"});
  	} 
    	if (postparms.p1 === "SELECT") {
				let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
				if (err) {
			    	res.json(err.message) ; 
			  	} 
			   		db.all(postparms.p2, [], (err, rows) => {
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


