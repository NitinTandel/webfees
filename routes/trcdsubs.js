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
        res.render('trcdsubmast');
    } else {
      res.render('noaccess');
    }
});


//=================================================================================
// Get list of all trcdsub
//=================================================================================
router.get('/listall', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT A.*, B.DESC AS TRCDDESC FROM TRCDSUB A, TRCD B WHERE A.TRCD = B.TRCD ", [ ], (err, rows) => {
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
// Get list of all trcds
//=================================================================================
router.get('/trcdlist', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT TRCD, DESC AS TRCDDESC FROM TRCD  ", [ ], (err, rows) => {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows);	
        	}
    		db.close();
    	});
	});
//    db.close();
});


//=================================================================================
// Get Trcd code by its name 
//=================================================================================
router.get('/currentTrcdID/:Nm', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT TRCD FROM TRCD WHERE DESC = ?", [req.params.Nm ], (err, rows) => {
        	if (err) {
        		res.json(err.message);
        	} else {
        		if (!rows)
        			res.json( {"TRCD" : "Incorrect Name"}) ;
        		else {
        			res.json(rows[0]);	
        		}
        	}
    	});
	});
    db.close();
});



//=================================================================================
// Get details of one TRCDsub
//=================================================================================
router.get('/details/:Id', (req, res, next) => {
	var parstr = req.params.Id ;
	var parArr = parstr.split("-") ;
	var trcdid = parArr[0] ;
	var subcdid = parArr[1] ;

	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT A.*, B.DESC AS TRCDDESC FROM TRCDSUB A, TRCD B WHERE A.TRCD = B.TRCD AND A.TRCD = ? AND A.SUBCD = ? ", [ trcdid, subcdid ], (err, rows) => {
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
	var subcdCode = req.body.SUBCD;
	var trcdsubName = req.body.DESC;
	var defAmount = req.body.DEFAULT_AMT;

	//check if duplicate TRCD
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		res.status(202).json({"message" : err.message, "error" : "Yes"});
  	} else {
		  db.get('SELECT * FROM TRCDSUB WHERE TRCD = ? AND SUBCD = ? ', [trcdCode, subcdCode ] , function(err, row) {
		    if (!row) {
		    	var sqlstmt = "INSERT INTO TRCDSUB (CO_CODE, TRCD, SUBCD, DESC, DEFAULT_AMT) VALUES ( ?, ?, ?, ?, ?)" ;
		        db.run(sqlstmt, [coCode, trcdCode, subcdCode, trcdsubName, defAmount ], function(err, row){
		            if (err){
		            	res.status(202).json({"message" : "Database Error!", "error" : "Yes"});
		            } else {
		            	res.status(202).json({"message" : 'Sub-transaction Code Added successfully!', "error" : "Yes"});
		            }
		            db.close();
		            res.end();
		        });
		    } else {
				res.status(202).json({"message" : 'Cannot add ! Sub-transaction Code "' + trcdCode + '-' + subcdCode + '" already exists!', "error" : "Yes"});
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
	var subcdCode = req.body.SUBCD;
	var trcdsubName = req.body.DESC;
	var defAmount = req.body.DEFAULT_AMT;

	//if data does not exists
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		db.close();
		res.status(500).json({"message" : err.message, "error" : "Yes"});
		res.end();
  	} else {
		  db.get('SELECT 1 FROM TRCDSUB WHERE TRCD = ? AND SUBCD = ?',  [ trcdCode, subcdCode], function(err, row) {
		    if (!row) {
				res.status(202).json({"message" : 'Cannot update ! Sub-transaction ID "' + trcdCode + '-' + subcdCode + '" does not exists!', "error" : "Yes"});
		    } else {
		    	var sqlstmt = "UPDATE TRCDSUB SET DESC = ?, DEFAULT_AMT = ? WHERE TRCD = ? AND SUBCD = ?" ;
		        db.run(sqlstmt, [ trcdsubName, defAmount, trcdCode, subcdCode], function(err, row){
		            if (err){
		            	res.status(202).json({"message" : err.message, "error" : "Yes"});
		            } else {
		            	res.status(202).json({"message" : 'Sub-Transaction updated successfully!', "error" : "No"});
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
	var parstr = req.params.Id ;
	var parArr = parstr.split("-") ;
	var trcdid = parArr[0] ;
	var subcdid = parArr[1] ;

	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		res.status(202).json({"message" : err.message, "error" : "Yes"})
  	} 
		var sqlstmt = "SELECT 1 FROM TRANSACT WHERE TRCD = ? AND SUBCD = ?" ;
		db.get(sqlstmt, [ trcdid, subcdid ] , function(err, rowdata){
		    if (!rowdata) {
				var sqlstmt = "DELETE FROM TRCDSUB WHERE TRCD = ? AND SUBCD = ?" ;
				db.run(sqlstmt, [ trcdid, subcdid ] , function(err, row){
				    if (err){
				        res.status(202).json({"message" : err.message, "error" : "Yes"});
				    } else {
				        res.status(202).json({"message" : "Sub-transaction Code : '" + req.params.Id + "' deleted successfully !" , "error" : "No"});
				    }
		    		db.close();
				    res.end();
				});
			} else {
		    	db.close();				
				res.status(202).json({"message" : "Cannot delete !! Transaction Code : '" + req.params.Id + "' already in use !", "error" : "Yes"});
			}
		});
	});
//    db.close();
});


module.exports = router;

