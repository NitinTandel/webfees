var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
//var config = require('../config');
var config = require( '/webfees/config');


//=================================================================================
// render pages
//=================================================================================
router.get('/', function(req, res, next){
    if (req.isAuthenticated()) {
        res.render('trcdmast');
    } else {
      res.render('noaccess');
    }
});


//=================================================================================
// Get list of all groups
//=================================================================================
router.get('/listall', (req, res, next) => {
//	console.log(req.user.DEFAULT_CO);
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT CO_CODE, TRCD, DESC FROM TRCD ", [], (err, rows) => {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows);	
        	}
    	});
	});
    db.close();
});


//=================================================================================
// Get details of one TRCD
//=================================================================================
router.get('/details/:Id', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT * FROM TRCD WHERE TRCD = ? ", [ req.params.Id ], (err, rows) => {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows[0]);	
        	}
    	});
	});
    db.close();
});


//=====================================================================
// Create new TRCD
//=====================================================================
router.post('/register', function(req, res){
	var coCode = 0 ; //req.user.DEFAULT_CO;;
	var trcdCode = req.body.TRCD;
	var trcdName = req.body.DESC;

	//check if duplicate TRCD
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		res.status(500).json({"message" : err.message, "error" : "Yes"});
  	} else {
		  db.get('SELECT * FROM TRCD WHERE TRCD = ? ', [trcdCode] , function(err, row) {
		    if (!row) {
		    	var sqlstmt = "INSERT INTO TRCD (CO_CODE, TRCD, DESC) VALUES ( ?, ?, ? )" ;
		        db.run(sqlstmt, [coCode, trcdCode, trcdName ], function(err, row){
		            if (err){
		            	res.status(202).json({"message" : "Database Error!", "error" : "Yes"});
		            } else {
		            	res.status(202).json({"message" : 'Transaction Code Added successfully!', "error" : "Yes"});
		            }
		            res.end();
		            db.close();
		        });
		    } else {
				res.status(202).json({"message" : 'Cannot add ! Transaction Code already exists!', "error" : "Yes"});
		    }
		  });
  		}
	});
//    db.close();
});

//==============================================================================
// update the TRCD
//==============================================================================
router.post('/update', function(req, res){
	var coCode = 0 ; //req.user.DEFAULT_CO;
	var trcdCode = req.body.TRCD;
	var trcdName = req.body.DESC;


	//if company does not exists
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		res.status(500).json({"message" : err.message, "error" : "Yes"});
		res.end();
  	} else {
		  db.get('SELECT 1 FROM TRCD WHERE TRCD = ?',  [ trcdCode], function(err, row) {
		    if (!row) {
				res.status(202).json({"message" : 'Cannot update ! Group ID "' + trcdCode + '" does not exists!', "error" : "Yes"});
		    } else {
		    	var sqlstmt = "UPDATE TRCD SET DESC = ?  WHERE TRCD = ?" ;
		        db.run(sqlstmt, [ trcdName, trcdCode], function(err, row){
		            if (err){
		            	res.status(202).json({"message" : err.message, "error" : "Yes"});
		            } else {
		            	res.status(202).json({"message" : 'Transaction Code updated successfully!', "error" : "No"});
		            }
		            db.close();
		            res.end();
		        });
		    }
		  });
  		}
	});
//    db.close();
});


//===============================================================
// Transaction Codes
// You can delete only when there is no Party available.
//================================================================
router.post('/delete/:Id', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		res.status(202).json({"message" : err.message, "error" : "Yes"})
  	} 
		var sqlstmt = "SELECT 1 FROM TRANSACT WHERE TRCD = ?" ;
		db.get(sqlstmt, [ req.params.Id ] , function(err, rowdata){
		    if (!rowdata) {
				var sqlstmt = "DELETE FROM TRCD WHERE TRCD = ?" ;
				db.run(sqlstmt, [ req.params.Id ] , function(err, row){
				    if (err){
				        res.status(202).json({"message" : err.message, "error" : "Yes"});
				    } else {
				        res.status(202).json({"message" : "Transaction Code : '" + req.params.Id + "' deleted successfully !" , "error" : "No"});
				    }
		    		db.close();
				    res.end();
				});
			} else {
				db.close();
				res.status(202).json({"message" : "Cannot delete !! Transaction Code : '" + req.params.Id + "' already in use !" , "error" : "Yes"});
			}
		});
	});
//    db.close();
});


module.exports = router;


