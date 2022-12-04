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
        res.render('groupmast');
    } else {
    	res.render('noaccess');
    }
});


//=================================================================================
// Get list of all groups
//=================================================================================
router.get('/listall', function(req, res, next)  {
//	console.log(req.user.DEFAULT_CO);
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT CO_CODE, GRP_CODE, GRP_NAME FROM GROUP_MAST ", [], function(err, rows)  {
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
// Get details of one group
//=================================================================================
router.get('/details/:Id', function(req, res, next)  {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT * FROM GROUP_MAST WHERE GRP_CODE = ? ", [ req.params.Id ], function(err, rows)  {
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
// Create new group
//=====================================================================
router.post('/register', function(req, res){
	var coCode = 0 ; //req.user.DEFAULT_CO;
	var grpCode = req.body.GRP_CODE;
	var grpName = req.body.GRP_NAME;
	var grpAdd1 = ((typeof req.body.ADDRESS1 === "undefined") ? "" : req.body.ADDRESS1);
	var grpAdd2 = ((typeof req.body.ADDRESS2 === "undefined") ? "" : req.body.ADDRESS2);
	var grpAdd3 = ((typeof req.body.ADDRESS3 === "undefined") ? "" : req.body.ADDRESS3);
	var grpAdd4 = ((typeof req.body.ADDRESS4 === "undefined") ? "" : req.body.ADDRESS4);

	//check if duplicate group
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err) {
	if (err) {
		res.status(500).json({"message" : err.message, "error" : "Yes"});
  	} else {
		 db.get('SELECT * FROM GROUP_MAST WHERE GRP_CODE = ? ', [grpCode ] , function(err, row) {
		    if (!row) {
		    	var sqlstmt = "INSERT INTO GROUP_MAST (CO_CODE, GRP_CODE, GRP_NAME, ADDRESS1, ADDRESS2, ADDRESS3, ADDRESS4) VALUES ( ?, ?, ?, ?, ?, ?, ?)" ;
		        db.run(sqlstmt, [coCode, grpCode, grpName, grpAdd1, grpAdd2, grpAdd3, grpAdd4], function(err, row){
		            if (err){
		            	res.status(202).json({"message" : "Database Error!", "error" : "Yes"});
		            } else {
		            	res.status(202).json({"message" : 'Group Added successfully!', "error" : "Yes"});
		            }
		            res.end();
//		            db.close();
		        });
		    } else {
				//Flash error message		    	
				res.status(202).json({"message" : 'Cannot add ! Group ID already exists!', "error" : "Yes"});
		    }
		  });
  		}
	});
    db.close();
});

//==============================================================================
// update the Group
//==============================================================================
router.post('/update', function(req, res){
	var coCode = 0 ; //req.user.DEFAULT_CO;
	var grpCode = req.body.GRP_CODE;
	var grpName = req.body.GRP_NAME;
	var grpAdd1 = ((typeof req.body.ADDRESS1 === "undefined") ? "" : req.body.ADDRESS1);
	var grpAdd2 = ((typeof req.body.ADDRESS2 === "undefined") ? "" : req.body.ADDRESS2);
	var grpAdd3 = ((typeof req.body.ADDRESS3 === "undefined") ? "" : req.body.ADDRESS3);
	var grpAdd4 = ((typeof req.body.ADDRESS4 === "undefined") ? "" : req.body.ADDRESS4);

	//if company does not exists
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
		res.status(500).json({"message" : err.message, "error" : "Yes"});
		res.end();
  	} else {
		  db.get('SELECT 1 FROM GROUP_MAST WHERE GRP_CODE = ?',  [ grpCode], function(err, row) {
		    if (!row) {
				//Flash error message		    	
				res.status(202).json({"message" : 'Cannot update ! Group ID "' + grpCode + '" does not exists!', "error" : "Yes"});
		    } else {
		    	var sqlstmt = "UPDATE GROUP_MAST SET GRP_NAME = ?, ADDRESS1 = ?, ADDRESS2 = ? , ADDRESS3 = ?, ADDRESS4 = ? WHERE GRP_CODE = ?" ;
		        db.run(sqlstmt, [ grpName, grpAdd1, grpAdd2, grpAdd3, grpAdd4, grpCode], function(err, row){
		            if (err){
		            	res.status(202).json({"message" : err.message, "error" : "Yes"});
		            } else {
		            	res.status(202).json({"message" : 'Group updated successfully!', "error" : "No"});
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
// Delete Group
// You can delete only when there is no Party available.
//================================================================
router.post('/delete/:Id', function(req, res, next)  {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
		res.status(202).json({"message" : err.message, "error" : "Yes"})
  	} 
		var sqlstmt = "SELECT 1 FROM ACC_MAST WHERE GRP_CODE = ?" ;
		db.get(sqlstmt, [ req.params.Id ] , function(err, rowdata){
		    if (!rowdata) {
				var sqlstmt = "DELETE FROM GROUP_MAST WHERE GRP_CODE = ?" ;
				db.run(sqlstmt, [ req.params.Id ] , function(err, row){
				    if (err){
				        res.status(202).json({"message" : err.message, "error" : "Yes"});
				    } else {
				        res.status(202).json({"message" : "Group : '" + req.params.Id + "' deleted successfully !" , "error" : "No"});
				    }
					db.close();
				    res.end();
				});
			} else {
				db.close();
				res.status(202).json({"message" : "Cannot delete group '" + req.params.Id + "' already in use !", "error" : "Yes"})
				res.end();
			}
		});
	});
//    db.close();
});


module.exports = router;


