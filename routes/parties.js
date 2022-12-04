var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
//var config = require('../config');
//var avslib = require('../AVSlib');
var config = require( '/webfees/config');
var avslib = require( '/webfees/AVSLib');



//=================================================================================
// render pages
//=================================================================================
router.get('/', function(req, res, next){
    if (req.isAuthenticated()) {
        res.render('partymast');
    } else {
    	res.render('noaccess');
    }
});



//=================================================================================
// Get list of all parties
//=================================================================================
router.get('/listall', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT A.CO_CODE, A.GRP_CODE, B.GRP_NAME, A.AC_CODE, A.AC_NAME, A.STATUS FROM ACC_MAST A, GROUP_MAST B WHERE A.GRP_CODE=B.GRP_CODE ", [], function(err, rows)  {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows);	
        	}
    	});
    	db.close();
	});
});


//=================================================================================
// Get list of all parties
//=================================================================================
router.get('/listActive', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT A.CO_CODE, A.GRP_CODE, B.GRP_NAME, A.AC_CODE, A.AC_NAME, A.STATUS FROM ACC_MAST A, GROUP_MAST B WHERE A.GRP_CODE=B.GRP_CODE AND A.STATUS = 1", [], function(err, rows)  {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows);	
        	}
    	});
    	db.close();
	});
});

//=================================================================================
// Get list of all party names and its codes
//=================================================================================
router.get('/namelist', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT AC_NAME, AC_CODE FROM ACC_MAST ", [], function(err, rows)  {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows);	
        	}
    	});
    	db.close();
	});
});


//=================================================================================
// Get list of all groups
//=================================================================================
router.get('/grouplist', function(req, res, next) {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT GRP_CODE, GRP_NAME FROM GROUP_MAST", [], function(err, rows)  {
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
// Get Group code by its name 
//=================================================================================
router.get('/currentGroupID/:Nm', function(req, res, next)  {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT GRP_CODE FROM GROUP_MAST WHERE GRP_NAME = ?", [req.params.Nm ], function(err, rows)  {
        	if (err) {
        		res.json(err.message);
        	} else {
        		if (!rows)
        			res.json( {"GRP_NAME" : "Incorrect Group"}) ;
        		else {
        			res.json(rows[0]);	
        		}
        	}
    	});
	});
    db.close();
});


//=================================================================================
// Get Group Name by its code
//=================================================================================
router.get('/currentGroupNm/:Id', function(req, res, next)  {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT GRP_NAME FROM GROUP_MAST WHERE GRP_CODE = ?", [req.params.Id ], function(err, rows)  {
        	if (err) {
        		res.json(err.message);
        	} else {
        		if (!rows)
        			res.json( {"GRP_CODE" : "Incorrect Group"}) ;
        		else {
        			res.json(rows[0]);	
        		}
        	}
    	});
	});
    db.close();
});


//=================================================================================
// Get details of one party
//=================================================================================
router.get('/details/:Id', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT A.*, B.GRP_NAME FROM ACC_MAST A, GROUP_MAST B WHERE A.AC_CODE = ? AND A.GRP_CODE=B.GRP_CODE ", [ req.params.Id ], (err, rows) => {
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
// Get Party code by its name 
//=================================================================================
router.get('/currentPartyID/:Nm', function(req, res, next)  {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT AC_CODE FROM ACC_MAST WHERE AC_NAME = ?", [req.params.Nm ], function(err, rows)  {
        	if (err) {
        		res.json(err.message);
        	} else {
        		if (!rows)
        			res.json( {"AC_NAME" : "Incorrect Party"}) ;
        		else {
        			res.json(rows[0]);	
        		}
        	}
    	});
	});
    db.close();
});



//=====================================================================
// Create new Party
//=====================================================================
router.post('/register', function(req, res){
	var coCode = 0 ; //req.user.DEFAULT_CO;
	var acCode = req.body.AC_CODE;
	var grpCode = req.body.GRP_CODE;
	var acName = req.body.AC_NAME;
	var acAdd1 = ((typeof req.body.ADDRESS1 === "undefined") ? "" : req.body.ADDRESS1);
	var acAdd2 = ((typeof req.body.ADDRESS2 === "undefined") ? "" : req.body.ADDRESS2);
	var acAdd3 = ((typeof req.body.ADDRESS3 === "undefined") ? "" : req.body.ADDRESS3);
	var acAdd4 = ((typeof req.body.ADDRESS4 === "undefined") ? "" : req.body.ADDRESS4);
	var acOffTel1 = ((typeof req.body.OFF_TEL1 === "undefined") ? "" : req.body.OFF_TEL1);
	var acOffTel2 = ((typeof req.body.OFF_TEL2 === "undefined") ? "" : req.body.OFF_TEL2);
	var acResTel1 = ((typeof req.body.RES_TEL1 === "undefined") ? "" : req.body.RES_TEL1);
	var acResTel2 = ((typeof req.body.RES_TEL2 === "undefined") ? "" : req.body.RES_TEL2);
	var acPAN1 = ((typeof req.body.PAN1 === "undefined") ? "" : req.body.PAN1);
	var acPAN2 = ((typeof req.body.PAN2 === "undefined") ? "" : req.body.PAN2);
	var acClosed = ((typeof req.body.CLOSED === "undefined") ? "" : req.body.CLOSED);

	var acORG_Type = req.body.ORG_TYPE ;
	var acDOB = ((typeof req.body.DOB === "undefined" ) ? null  : avslib.formatDate(new Date(req.body.DOB)));
	var acSEX = req.body.SEX ;

	var acAdv_Tax  = (req.body.ADV_TAX_OPT ? 1 : 0 )  ;
	var acTax_Audit = (req.body.TAX_AUDIT_OPT ? 1 : 0 ) ;
	var acGST_Appl = (req.body.GST_APPL_OPT ? 1 : 0 );
	var acGST_NO  = req.body.GST_NO ;
	var acTDS_appl = (req.body.TDS_APPL_OPT ? 1 : 0) ;
    var prtStatus =  (req.body.ACTIVESTATUS  ? 1 : 0 ) ; 


	//check if duplicate group
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		res.status(202).json({"message" : err.message, "error" : "Yes"});
  	} else {
		  db.get('SELECT * FROM ACC_MAST WHERE AC_CODE = ? ', [acCode] , function(err, row) {
		    if (!row) {
		    	var sqlstmt = "INSERT INTO ACC_MAST (CO_CODE, AC_CODE, GRP_CODE, AC_NAME, ADDRESS1, ADDRESS2, ADDRESS3, ADDRESS4, OFF_TEL1, OFF_TEL2, RES_TEL1, RES_TEL2, PAN1, PAN2, STATUS, DOB, ORG_TYPE, SEX, ADV_TAX, TAX_AUDIT, TDS_APPLICABLE, GST_APPLICABLE, GST_NO) "
		    	sqlstmt = sqlstmt + " VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )" ;
		        db.run(sqlstmt, [coCode, acCode, grpCode, acName, acAdd1, acAdd2, acAdd3, acAdd4, acOffTel1, acOffTel2, acResTel1, acResTel2, acPAN1, acPAN2, prtStatus, acDOB, acORG_Type, acSEX, acAdv_Tax, acTax_Audit, acTDS_appl, acGST_Appl, acGST_NO], function(err, row){
		            if (err){
		            	res.status(202).json({"message" : "Database Error!", "error" : "Yes"});
		            } else {
		            	res.status(202).json({"message" : 'Party Added successfully!', "error" : "Yes"});
		            }
		            res.end();
//		            db.close();
		        });
		    } else {
				res.status(202).json({"message" : 'Cannot add ! Party ID already exists!', "error" : "Yes"});
		    }
		  });
  		}
	});
    db.close();
});

//==============================================================================
// update the Party
//==============================================================================
router.post('/update', function(req, res){
	var coCode = 0 ; //req.user.DEFAULT_CO;
	var acCode = req.body.AC_CODE;
	var grpCode = req.body.GRP_CODE;
	var acName = req.body.AC_NAME;
	var acAdd1 = ((typeof req.body.ADDRESS1 === "undefined") ? "" : req.body.ADDRESS1);
	var acAdd2 = ((typeof req.body.ADDRESS2 === "undefined") ? "" : req.body.ADDRESS2);
	var acAdd3 = ((typeof req.body.ADDRESS3 === "undefined") ? "" : req.body.ADDRESS3);
	var acAdd4 = ((typeof req.body.ADDRESS4 === "undefined") ? "" : req.body.ADDRESS4);
	var acOffTel1 = ((typeof req.body.OFF_TEL1 === "undefined") ? "" : req.body.OFF_TEL1);
	var acOffTel2 = ((typeof req.body.OFF_TEL2 === "undefined") ? "" : req.body.OFF_TEL2);
	var acResTel1 = ((typeof req.body.RES_TEL1 === "undefined") ? "" : req.body.RES_TEL1);
	var acResTel2 = ((typeof req.body.RES_TEL2 === "undefined") ? "" : req.body.RES_TEL2);
	var acPAN1 = ((typeof req.body.PAN1 === "undefined") ? "" : req.body.PAN1);
	var acPAN2 = ((typeof req.body.PAN2 === "undefined") ? "" : req.body.PAN2);

	var acORG_Type = req.body.ORG_TYPE ;
	var acDOB = ((typeof req.body.DOB === "undefined" ) ? null  : avslib.formatDate(new Date(req.body.DOB)));
	var acSEX = req.body.SEX ;

	var acAdv_Tax  = (req.body.ADV_TAX_OPT ? 1 : 0 )  ;
	var acTax_Audit = (req.body.TAX_AUDIT_OPT ? 1 : 0 ) ;
	var acGST_Appl = (req.body.GST_APPL_OPT ? 1 : 0 );
	var acGST_NO  = req.body.GST_NO ;
	var acTDS_appl = (req.body.TDS_APPL_OPT ? 1 : 0) ;
    var prtStatus =  (req.body.ACTIVESTATUS  ? 1 : 0 ) ; 


	//if company does not exists
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		res.status(500).json({"message" : err.message, "error" : "Yes"});
		res.end();
  	} else {
		  db.get('SELECT 1 FROM ACC_MAST WHERE AC_CODE = ?',  [ acCode], function(err, row) {
		    if (!row) {
				res.status(202).json({"message" : 'Cannot update ! Party ID "' + grpCode + '" does not exists!', "error" : "Yes"});
		    } else {
		    	var sqlstmt = "UPDATE ACC_MAST SET AC_NAME = ?, GRP_CODE = ?, ADDRESS1 = ?, ADDRESS2 = ? , ADDRESS3 = ?, ADDRESS4 = ?, OFF_TEL1=?, OFF_TEL2=?, RES_TEL1=?, RES_TEL2=? , PAN1= ?, PAN2=? , STATUS = ?, DOB = ?, ORG_TYPE = ?, SEX = ?, ADV_TAX = ?, TAX_AUDIT = ?, TDS_APPLICABLE = ?, GST_APPLICABLE =?, GST_NO = ? WHERE AC_CODE = ?" ;
		        db.run(sqlstmt, [ acName, grpCode, acAdd1, acAdd2, acAdd3, acAdd4, acOffTel1, acOffTel2, acResTel1, acResTel2, acPAN1, acPAN2, prtStatus, acDOB, acORG_Type, acSEX, acAdv_Tax, acTax_Audit, acTDS_appl, acGST_Appl, acGST_NO, acCode], function(err, row){
		            if (err){
		            	res.status(202).json({"message" : err.message, "error" : "Yes"});
		            } else {
		            	res.status(202).json({"message" : 'Party updated successfully!', "error" : "No"});
		            }
		            res.end();
//		            db.close();
		        });
		    }
		  });
  		}
	});
    db.close();
});


//===============================================================
//Delete Group
// You can delete only when there is no Party available.
//================================================================
router.post('/delete/:Id', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		res.status(202).json({"message" : err.message, "error" : "Yes"})
  	} 
		var sqlstmt = "SELECT 1 FROM VOUCHERS WHERE AC_CODE = ?" ;
		db.get(sqlstmt, [ req.params.Id ] , function(err, rowdata){
		    if (!rowdata) {
				var sqlstmt1 = "DELETE FROM ACC_MAST WHERE AC_CODE = ?" ;
				db.run(sqlstmt1, [ req.params.Id ] , function(err, row){
				    if (err){
				        res.status(202).json({"message" : err.message, "error" : "Yes"});
				    } else {
				        res.status(202).json({"message" : "Party : '" + req.params.Id + "' deleted successfully !" , "error" : "No"});
				    }
		    		db.close();
				    res.end();
				});
			} else {			
				res.status(202).json({"message" : 'Cannot delete ! one or more bills exists for Party ID "' + req.params.Id + '" !', "error" : "Yes"});
			}
		});
	});
});



//=======================================================================
// change the Party code
//    It should change the party code everywhere 
//=======================================================================
router.get('/changeprtcode', function(req, res, next){
    if (req.isAuthenticated()) {
        res.render('changeprtcode');
    } else {
      res.render('noaccess');
    }
});


router.post('/changePartyCode', function(req, res){
	var oldCode = req.body[0].AC_CODE;
	var newCode = req.body[0].NEW_AC_CODE;

	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
		if (err) {
			res.status(202).json({"message" : err.message, "error" : "Yes"})
	  	} else {
			//Check if the new code does not exists already
			var sqlstmt = "SELECT 1 FROM ACC_MAST WHERE AC_CODE = ?" ;
			db.get(sqlstmt, [ newCode ] , function(err, rowdata){
			    if (!rowdata) {
			    	var sqlstmt = "UPDATE ACC_MAST SET AC_CODE = ? WHERE AC_CODE = ?" ;
			        db.run(sqlstmt, [newCode, oldCode], function(err, row){
			            if (err){
			            	res.status(202).json({"message" : err.message, "error" : "Yes"});
			            } else {
					    	var sqlstmt = "UPDATE VOUCHERS SET AC_CODE = ? WHERE AC_CODE = ?" ;
					        db.run(sqlstmt, [newCode, oldCode], function(err, row){
					            if (err){
					            	res.status(202).json({"message" : err.message, "error" : "Yes"});
					            } else {
					            	res.status(202).json({"message" : 'Party code updated successfully!', "error" : "No"});
			    					db.close();	
			    					res.end();		           
					            }
					        });
			            }
			        });
			    } else {
			    	db.close();
			    	res.status(202).json({"message" : "Cannot change! New Party code already exist !" , "error" : "Yes"});
			    	res.end();
			    }	
			});
	  	}
	});
});


module.exports = router;


