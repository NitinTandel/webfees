var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
//var config = require('../config');
//var avslib = require('../AVSlib');
var config = require( '/webfees/config');
var avslib = require('/webfees/AVSLib');

//=================================================================================
// render pages
//=================================================================================
router.get('/', function(req, res, next){
    if (req.isAuthenticated()) {
        res.render('years');
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
   		db.all("SELECT * FROM YEARS ", [], (err, rows) => {
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
// Get Current year Data
//=================================================================================
router.get('/CurrentYearData', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	  if (err) {
		  res.json(err.message) ; 
		} else {
		  db.get("SELECT * FROM YEARS WHERE YEAR = ? ", [req.user.DEFAULT_YEAR], (err, rows) => {
			if (!rows) {
			  res.json(err.message);
			} else {
			  res.json(rows);  
			}
		  });
		}
		db.close();
	});
  });
  
//=================================================================================
// Get details of one Year
//=================================================================================
router.get('/details/:Id', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT * FROM YEARS WHERE YEAR = ? ", [ req.params.Id ], (err, rows) => {
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
// Create new Year
//=====================================================================
router.post('/register', function(req, res){
	var coCode = 0 ; //req.user.DEFAULT_CO;;
	var yearCode = req.body.YEAR;
	var yrFrom_DT = ((!req.body.FROM_DT) ? ""  : avslib.formatDate(new Date(req.body.FROM_DT)));
	var yrTo_DT = ((!req.body.TO_DT) ? ""  : avslib.formatDate(new Date(req.body.TO_DT)));
	var yrAY = req.body.AY;
	var yrITDue_DT1 = ((!req.body.IT_DUE_DT1) ? ""  : avslib.formatDate(new Date(req.body.IT_DUE_DT1)));
	var yrITDue_DT2 = ((!req.body.IT_DUE_DT2) ? ""  : avslib.formatDate(new Date(req.body.IT_DUE_DT2)));
	var yrITDue_DT3 = ((!req.body.IT_DUE_DT3) ? ""  : avslib.formatDate(new Date(req.body.IT_DUE_DT3)));
	var yrITDue_DT4 = ((!req.body.IT_DUE_DT4) ? ""  : avslib.formatDate(new Date(req.body.IT_DUE_DT4)));


	//check if duplicate TRCD
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		res.status(500).json({"message" : err.message, "error" : "Yes"});
  	} else {
		  db.get('SELECT * FROM YEARS WHERE YEAR = ? ', [yearCode] , function(err, row) {
		    if (!row) {
		    	var sqlstmt = "INSERT INTO YEARS (YEAR, FROM_DT, TO_DT, AY, IT_DUE_DT1, IT_DUE_DT2, IT_DUE_DT3, IT_DUE_DT4) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )" ;
		        db.run(sqlstmt, [yearCode, yrFrom_DT, yrTo_DT, yrAY, yrITDue_DT1, yrITDue_DT2, yrITDue_DT3, yrITDue_DT4], function(err, row){
		            if (err){
		            	res.status(202).json({"message" : "Database Error!", "error" : "Yes"});
		            } else {
		            	res.status(202).json({"message" : 'Accounting year Added successfully!', "error" : "Yes"});
		            }
		            res.end();
		            db.close();
		        });
		    } else {
				res.status(202).json({"message" : 'Cannot add ! Accounting year already exists!', "error" : "Yes"});
				db.close();
		    }
		  });
  		}
	});
//    db.close();
});

//==============================================================================
// update the Year
//==============================================================================
router.post('/update', function(req, res){
	var coCode = 0 ; //req.user.DEFAULT_CO;
	var yearCode = req.body.YEAR;
	var yrFrom_DT = ((!req.body.FROM_DT) ? ""  : avslib.formatDate(new Date(req.body.FROM_DT)));
	var yrTo_DT = ((!req.body.TO_DT) ? ""  : avslib.formatDate(new Date(req.body.TO_DT)));
	var yrAY = req.body.AY;
	var yrITDue_DT1 = ((!req.body.IT_DUE_DT1) ? ""  : avslib.formatDate(new Date(req.body.IT_DUE_DT1)));
	var yrITDue_DT2 = ((!req.body.IT_DUE_DT2) ? ""  : avslib.formatDate(new Date(req.body.IT_DUE_DT2)));
	var yrITDue_DT3 = ((!req.body.IT_DUE_DT3) ? ""  : avslib.formatDate(new Date(req.body.IT_DUE_DT3)));
	var yrITDue_DT4 = ((!req.body.IT_DUE_DT4) ? ""  : avslib.formatDate(new Date(req.body.IT_DUE_DT4)));


	//if company does not exists
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		res.status(500).json({"message" : err.message, "error" : "Yes"});
		res.end();
  	} else {
		  db.get('SELECT 1 FROM YEARS WHERE YEAR = ?',  [ yearCode], function(err, row) {
		    if (!row) {
				res.status(202).json({"message" : 'Cannot update ! Year : "' + yearCode + '" does not exists!', "error" : "Yes"});
		    } else {
		    	var sqlstmt = "UPDATE YEARS SET FROM_DT = ?, TO_DT = ?, AY = ?, IT_DUE_DT1 = ?, IT_DUE_DT2 =? , IT_DUE_DT3 =? , IT_DUE_DT4 =? WHERE YEAR = ?" ;
		        db.run(sqlstmt, [ yrFrom_DT, yrTo_DT, yrAY, yrITDue_DT1, yrITDue_DT2, yrITDue_DT3, yrITDue_DT4 , yearCode], function(err, row){
		            if (err){
		            	res.status(202).json({"message" : err.message, "error" : "Yes"});
		            } else {
		            	res.status(202).json({"message" : 'Accounting year updated successfully!', "error" : "No"});
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
// Delete Year
//================================================================
router.post('/delete/:Id', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		res.status(202).json({"message" : err.message, "error" : "Yes"})
  	} 
		var sqlstmt = "SELECT 1 FROM VOUCHERS WHERE YEAR = ?" ;
		db.get(sqlstmt, [ req.params.Id ] , function(err, rowdata){
		    if (!rowdata) {
				var sqlstmt = "DELETE FROM YEARS WHERE YEAR = ?" ;
				db.run(sqlstmt, [ req.params.Id ] , function(err, row){
				    if (err){
				        res.status(202).json({"message" : err.message, "error" : "Yes"});
				    } else {
				        res.status(202).json({"message" : "Year : '" + req.params.Id + "' deleted successfully !" , "error" : "No"});
				    }
		    		db.close();
				    res.end();
				});
			} else {
				db.close();
				res.status(202).json({"message" : "Cannot delete !! year : '" + req.params.Id + "' already in use !" , "error" : "Yes"});
			}
		});
	});
//    db.close();
});

module.exports = router;


