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
        res.render('company');
    } else {
    	res.render('noaccess');
    }
});


//=================================================================================
// Get list of all companies
//=================================================================================
router.get('/listall', function(req, res, next)  {
	var db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ;
  	}
   		db.all("SELECT CO_CODE, COMPANY, EMAIL, TEL1 FROM COMPANY", [], function(err, rows)  {
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
// Get details of one company
//=================================================================================
router.get('/details/:Id', function(req, res, next)  {
	var db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ;
  	}
   		db.all("SELECT * FROM COMPANY WHERE CO_CODE = ?", [ req.params.Id ], function(err, rows)  {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows[0]);
        	}
    	});
	});
    db.close();
});

//=================================================================================
// Get All company Data
//=================================================================================
router.get('/allCoData', (req, res, next) => {
	//	console.log(req.user.DEFAULT_CO);
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
  

//=================================================================================
// Get list of all years
//=================================================================================
router.get('/yearslist', function(req, res, next)  {
	var db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ;
  	}
   		db.all("SELECT YEAR FROM YEARS", [], function(err, rows)  {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows);
        	}
    	});
	});
    db.close();
});

//=====================================================================
// Register new company
//=====================================================================
router.post('/register', function(req, res){
	var coCode = req.body.CO_CODE;
	var coName = req.body.COMPANY;
	var coAdd1 = ((typeof req.body.ADD1 === "undefined") ? "" : req.body.ADD1);
	var coAdd2 = ((typeof req.body.ADD2 === "undefined") ? "" : req.body.ADD2);
	var coAdd3 = ((typeof req.body.ADD3 === "undefined") ? "" : req.body.ADD3);
	var coState = ((typeof req.body.STATE === "undefined") ? "" : req.body.STATE);
	var coCityDist = ((typeof req.body.CITY_DIST === "undefined") ? "" : req.body.CITY_DIST);
	var coPin = ((typeof req.body.PIN === "undefined") ? "" : req.body.PIN);
	var coEmail = ((typeof req.body.EMAIL === "undefined") ? "" : req.body.EMAIL);
	var coTel1 = ((typeof req.body.TEL1 === "undefined") ? "" : req.body.TEL1);
	var coTel2 = ((typeof req.body.TEL2 === "undefined") ? "" : req.body.TEL2);
	var coPAN = ((typeof req.body.PAN_NO === "undefined") ? "" : req.body.PAN_NO);


	//check if duplicate company
	var db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
		res.status(500).json({"message" : err.message, "error" : "Yes"});
  	} else {
		  db.get('SELECT * FROM COMPANY WHERE CO_CODE = ?', [coCode] , function(err, row) {
		    if (!row) {
		    	var sqlstmt = "INSERT INTO COMPANY (CO_CODE, COMPANY, ADD1, ADD2, ADD3, STATE, CITY_DIST, PIN, EMAIL, TEL1, TEL2, PAN_NO) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ;
		        db.run(sqlstmt, [coCode, coName, coAdd1, coAdd2, coAdd3, coState, coCityDist, coPin, coEmail, coTel1, coTel2, coPAN ], function(err, row){
		            if (err){
		            	res.status(202).json({"message" : "Database Error!", "error" : "Yes"});
		            } else {
		            	res.status(202).json({"message" : 'Company Added successfully!', "error" : "Yes"});
		            }
		            res.end();
		            db.close();
		        });
		    } else {
				//Flash error message
				res.status(202).json({"message" : 'Cannot add ! CompanyID already exists!', "error" : "Yes"});
		    }
    		db.close();
		  });
  		}
	});
});

//==============================================================================
// update the Company
//==============================================================================
router.post('/update', function(req, res){
	var coCode = req.body.CO_CODE;
	var coName = req.body.COMPANY;
	var coAdd1 = ((typeof req.body.ADD1 === "undefined") ? "" : req.body.ADD1);
	var coAdd2 = ((typeof req.body.ADD2 === "undefined") ? "" : req.body.ADD2);
	var coAdd3 = ((typeof req.body.ADD3 === "undefined") ? "" : req.body.ADD3);
	var coState = ((typeof req.body.STATE === "undefined") ? "" : req.body.STATE);
	var coCityDist = ((typeof req.body.CITY_DIST === "undefined") ? "" : req.body.CITY_DIST);
	var coPin = ((typeof req.body.PIN === "undefined") ? "" : req.body.PIN);
	var coEmail = ((typeof req.body.EMAIL === "undefined") ? "" : req.body.EMAIL);
	var coTel1 = ((typeof req.body.TEL1 === "undefined") ? "" : req.body.TEL1);
	var coTel2 = ((typeof req.body.TEL2 === "undefined") ? "" : req.body.TEL2);

	var coBankNm = ((typeof req.body.BANK_NAME === "undefined") ? "" : req.body.BANK_NAME);
	var coBankAc = ((typeof req.body.AC_NUM === "undefined") ? "" : req.body.AC_NUM);
	var coBankAcType = ((typeof req.body.AC_TYPE === "undefined") ? "" : req.body.AC_TYPE);
	var coIFSC = ((typeof req.body.IFSC_CODE === "undefined") ? "" : req.body.IFSC_CODE);
	var coMICR = ((typeof req.body.MICR === "undefined") ? "" : req.body.MICR);
	var coPAN = ((typeof req.body.PAN_NO === "undefined") ? "" : req.body.PAN_NO);

	//if company does not exists
	var db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
		res.status(500).json({"message" : err.message, "error" : "Yes"});
		res.end();
  	} else {
		  db.get('SELECT * FROM COMPANY WHERE CO_CODE = ?',  [coCode], function(err, row) {
		    if (!row) {
				//Flash error message
				res.status(202).json({"message" : 'Cannot update ! Company ID' +coCode + 'does not exists!', "error" : "Yes"});
		    } else {
		    	var sqlstmt = 'UPDATE COMPANY SET COMPANY = ?, ADD1 = ?, ADD2 = ? , ADD3 = ?, STATE = ?, CITY_DIST = ?, PIN = ?, EMAIL = ?, TEL1 = ?, TEL2 = ? ,'
		    	sqlstmt = sqlstmt  + ' BANK_NAME = ? , AC_NUM = ? , AC_TYPE = ? , IFSC_CODE = ? , MICR = ?, PAN_NO = ? '
		    	sqlstmt = sqlstmt  + ' WHERE CO_CODE = ? ' ;
		        db.run(sqlstmt, [ coName, coAdd1, coAdd2, coAdd3, coState, coCityDist, coPin, coEmail, coTel1, coTel2 , coBankNm, coBankAc, coBankAcType, coIFSC, coMICR, coPAN, coCode], function(err, row){
		            if (err){
		            	res.status(202).json({"message" : err.message, "error" : "Yes"});
		            } else {
		            	res.status(202).json({"message" : 'Company updated successfully!', "error" : "No"});
		            }
		            res.end();
		            db.close();
		        });
		    }
		  });
  		}
	});
});


//===============================================================
//Delete company
// You can delete only when there is no transaction available.
//================================================================
router.post('/delete/:Id', function(req, res, next)  {
	var db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
		res.status(500).json({"message" : err.message, "error" : "Yes"})
  	}
		var sqlstmt = "DELETE FROM COMPANY WHERE CO_CODE = ?" ;
		db.run(sqlstmt, [ req.params.Id ] , function(err, row){
		    if (err){
		        res.status(500).json({"message" : err.message, "error" : "Yes"});
		    } else {
		        res.status(202).json({"message" : "Company : '" + req.params.Id + "' deleted successfully !" , "error" : "No"});
		    }
   			db.close();
		    res.end();
		});
	});
});


module.exports = router;


