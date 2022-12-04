// Updated on : 21/8/2021
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
//var config = require('../config');
var config = require( '/webfees/config');

//var objBillFormat = require('../routes/BillFormat');
var objBillFormat = require( '/webfees/routes/BillFormat');

var async = require('async');

var endOfLine = require('os').EOL;

var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

var fs = require('fs');
var pdf = require('html-pdf');
var http = require('http');

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}


function getFinYear(mdate) {
  var monthIndex = mdate.getMonth() + 1;
  var year = mdate.getFullYear();

  if(monthIndex <= 3) {
     var year1 = (year - 1)
     var year2 = year
  } else {
     var year1 = year 
     var year2 = year + 1
  }
   var strYear1 = year1.toString();
   var strYear2 = year2.toString();
   return strYear1 + '-' + strYear2.substring(2);
}

function formatDate(mdate) {
  var monthIndex = mdate.getMonth();
  var year = mdate.getFullYear();
  var day = mdate.getDate();
  return year + '-' + pad(monthIndex + 1, 2) + '-' + pad(day, 2);
}


/*
http.createServer(function (req, res) {
  //res.write
  res.write('<html><head></head><body>');
  res.write('<p>Hi, Print this to PDF</p>');
  res.end('</body></html>');
}).listen(4444);
*/


//=================================================================================
// render pdf pages
//=================================================================================
/*
router.get('/billprnt', function(req, res, next){
/*
	http.get('http://google.com/', (resp) => {
  		let data = '';

  		// A chunk of data has been recieved.
  		resp.on('data', (chunk) => {
    		data += chunk;
  		});

  		// The whole response has been received. Print out the result.
  		resp.on('end', () => {
    		console.log('page serviced');
  		});

		}).on("error", (err) => {
  			console.log("Error: " + err.message);
		});
*/		
/*
	var options = {
  		host: 'http://localhost',
  		port: 4444,
  		path: '/foo.html'
		};
	http.get(options, function(resp){
		resp.on('data', function(chunk){
			//do something
		});
	}).on("error", function(e){
		console.log("Error" + e.message);
	});


//	wkhtmltopdf('http://google.com/', {pagesize: 'letter'}, function(err, stream){
//		res.send('ok');
//	});

	var html = fs.readFileSync('./views/billprint.html', 'utf8');
	var options = { format: 'Letter' };

	pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
	  if (err) return console.log(err);
//	  console.log(res); // { filename: '/app/businesscard.pdf' } 
	});

});

*/


//=================================================================================
// render pages
//=================================================================================
router.get('/', function(req, res, next){
    if (req.isAuthenticated()) {
        res.render('makebills');
    } else {
      res.render('noaccess');
    }
});

//=================================================================================
// Get Current compenay Data
//=================================================================================
router.get('/CurrentCoData', (req, res, next) => {
//	console.log(req.user.DEFAULT_CO);
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT * FROM COMPANY WHERE CO_CODE = ?", [req.user.DEFAULT_CO], (err, rows) => {
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
// Get list of all bills
//=================================================================================
router.get('/listall', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT A.BILLID, A.CO_CODE, SUBSTR('0000'|| A.BILL_NO, -4, 4) AS BILL_STR, A.BILL_NO, A.BILL_DT, A.AC_CODE, B.AC_NAME, A.BILL_AMT, A.PREV_BAL, A.TOT_GST, A.TOT_AMT, A.CLIND  FROM VOUCHERS A, ACC_MAST B WHERE A.AC_CODE=B.AC_CODE AND A.YEAR= ? AND A.CO_CODE = ?  ORDER BY 3", [req.user.DEFAULT_YEAR, req.user.DEFAULT_CO], (err, rows) => {
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
// Get details of one bill
//=================================================================================
router.get('/details/:Id', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT A.*, B.AC_NAME, B.ADDRESS1, B.ADDRESS2, B.ADDRESS3, B.ADDRESS4 FROM VOUCHERS A, ACC_MAST B WHERE A.AC_CODE=B.AC_CODE AND A.BILLID = ? AND A.CO_CODE = ? ", [ req.params.Id , req.user.DEFAULT_CO], (err, rows) => {
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
// Get details of Previous Balance by party id
//=================================================================================
router.get('/PreviousBal/:PrtId', (req, res, next) => {
  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json({"message" : "No Data", "error" : "No"}) ; 
      db.close();
    } else {
      db.all("SELECT COUNT(*) AS BILLCOUNT FROM VOUCHERS WHERE AC_CODE= ? AND IFNULL(CLIND, 'N') <> 'Y' AND CO_CODE= ? AND IFNULL(TOT_AMT, 0) - IFNULL(RCPT_AMT,0) > 0", [ req.params.PrtId , req.user.DEFAULT_CO], (err, rows) => {
        if (err) {
            res.status(202).json({"message" : "No Data", "error" : "No"});
            db.close();
        } else {        
          //console.log(rows[0]);
          if(rows[0].BILLCOUNT > 0 ) {
            db.all("SELECT BILLID, BILL_NO, BILL_DT, (IFNULL(TOT_AMT, 0) - IFNULL(RCPT_AMT,0)) AS BAL_AMT FROM VOUCHERS WHERE AC_CODE= ? AND IFNULL(CLIND, 'N') <> 'Y' AND CO_CODE= ? AND IFNULL(TOT_AMT, 0) - IFNULL(RCPT_AMT,0) > 0", [ req.params.PrtId , req.user.DEFAULT_CO], (err, rows) => {
                if (err) {
                  res.json({"message" : "No Data", "error" : "No"} );
                } else {
                  res.json(rows[0]); 
                }
                db.close();
            });              
          } else {
            res.status(202).json({"message" : "No Data", "error" : "No"});            
            db.close();
          }
        }   
      });
    }
  });
});

//=================================================================================
// Get details of one bill
//=================================================================================
router.get('/billtranctions/:Id', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
  		var sqlstmt = "SELECT A.BILLID, A.CO_CODE, A.YEAR, A.BILL_NO, A.BILL_DT, A.TRCD, B.DESC AS TRCDDESC, A.SUBCD, C.DESC AS SUBDESC, A.REMARKS, A.BILL_AMT " 
					  + " FROM TRANSACT A, TRCD B, TRCDSUB C "
					  + " WHERE A.TRCD=B.TRCD "
					  +	" AND A.TRCD=C.TRCD AND A.SUBCD=C.SUBCD "
					  + " AND A.BILLID = ? AND A.CO_CODE = ? "
   		db.all(sqlstmt, [ req.params.Id , req.user.DEFAULT_CO], (err, rows) => {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows);	
        	}
    	});
	});
    db.close();
});



/*
router.get('/newbillfulldata', (req, res, next) => {
  var rtnData = {} ;
  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message);
    } 
      db.all("SELECT MAX(BILLID) + 1 AS NEWBILLID FROM VOUCHERS ", [ ], (err, rows) => {
          if (err) {
            res.json(err.message);
          } else {
            rtnData.NEWBILLID = rows[0].NEWBILLID;  
            var sqlstmt = "SELECT MAX(A.BILL_NO) + 1 AS NEWBILL_NO FROM VOUCHERS WHERE CO_CODE = ? " 
            db.all(sqlstmt, [  req.user.DEFAULT_CO], (err, rows) => {
                if (err) {
                  res.json(err.message);
                } else {
                  rtnData.NEWBILL_NO = rows[0].NEWBILL_NO;  
                  res.json(rtnData);
                }
            });
          }
      });
  });
  db.close();
});
*/


router.get('/billfulldata/:Id', (req, res, next) => {
  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  var rtnData = {} ;
  if (err) {
      res.json(err.message);
    } 
      db.all("SELECT A.*, B.AC_NAME, B.ADDRESS1, B.ADDRESS2, B.ADDRESS3, B.ADDRESS4, B.PAN1 FROM VOUCHERS A, ACC_MAST B WHERE A.AC_CODE=B.AC_CODE AND A.BILLID = ? AND A.CO_CODE = ? ", [ req.params.Id , req.user.DEFAULT_CO], (err, rows) => {
          if (err) {
            res.json(err.message);
          } else {
            rtnData = rows[0];  
            var sqlstmt = "SELECT A.BILLID, A.CO_CODE, A.YEAR, A.BILL_NO, A.BILL_DT, A.TRCD, B.DESC AS TRCDDESC, A.SUBCD, C.DESC AS SUBDESC, A.REMARKS, A.BILL_AMT " 
                  + " FROM TRANSACT A, TRCD B, TRCDSUB C "
                  + " WHERE A.TRCD=B.TRCD "
                  + " AND A.TRCD=C.TRCD AND A.SUBCD=C.SUBCD "
                  + " AND A.BILLID = ? AND A.CO_CODE = ? "
            db.all(sqlstmt, [ req.params.Id , req.user.DEFAULT_CO], (err, rows) => {
                if (err) {
                  res.json(err.message);
                } else {
                  rtnData.transactions = rows; 
                  res.json(rtnData);
                }
            });
          }
      });
  });
  db.close();
});


//=====================================================================
// Create new bILL
//=====================================================================
router.post('/register', function(req, res){
  var coCode = req.user.DEFAULT_CO;
  var billId = 0;
  var billNo = 0;
  var billDate = formatDate(new Date(req.body.selectedbillDt));
  var billYear = getFinYear(new Date(req.body.selectedbillDt));
  var AcCode = req.body.AC_CODE;
  var TotAmt = req.body.TOT_AMT;
  var BillAmt = TotAmt ;
  var CloseIndic =  ((req.body.isClosed) ? "Y" : "N" ) ;// req.body.CLIND;
  var prevBillId = req.body.LASTBILLID;

  var BillForYear = req.body.BILL_FOR_YEAR;
  var BillRemarks = req.body.REMARK;
 

  var TranData = req.body.transactions ;
  var isError = false;
  var errMsg = "" ;

	let db = new sqlite3.Database(config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		  res.status(500).json({"message" : err.message, "error" : "Yes"});
  	} else {
      db.serialize(function() {
        //Get the newBill ID
        db.get('SELECT MAX(BILLID)+1 AS NEWBILLID FROM VOUCHERS',  [ ], function(err, row) {
            billId = row.NEWBILLID ;
            //Get the newBill No
            db.get('SELECT MAX(CAST(BILL_NO AS LONG ))+1 AS NEWBILL_NO FROM VOUCHERS WHERE CO_CODE = ? AND YEAR =  ?',  [ coCode, billYear], function(err, row) {
                var billNo = ((!row) ? 1 : (!row.NEWBILL_NO) ? 1 : row.NEWBILL_NO) ;
                var sqlstmt = `INSERT INTO VOUCHERS (BILLID, CO_CODE, BILL_NO, BILL_DT, AC_CODE, BILL_AMT, TOT_AMT, YEAR, 
                               BILL_FOR_YEAR, REMARK, CLIND, LASTBILLID) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )` ;
                db.run(sqlstmt, [ billId, coCode, billNo, billDate, AcCode, BillAmt, TotAmt, billYear, BillForYear, BillRemarks, CloseIndic, prevBillId ], function(err, row){ 
                  isError = (err ? true : false );
                  errMsg = (err ? err.message : "");
                  db.serialize(function() {
                      for(var i=0; i< TranData.length; i++){
                        var valTRCD = TranData[i].TRCD ;
                        var valSUBCD = TranData[i].SUBCD ;
                        var valRemark = TranData[i].REMARKS ;
                        var valAmt = TranData[i].BILL_AMT ;
                        var sqlstmt = "INSERT INTO TRANSACT (BILLID, CO_CODE, BILL_NO, BILL_DT, TRCD, SUBCD, REMARKS, BILL_AMT) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )" ;
                        db.run(sqlstmt, [ billId, coCode, billNo, billDate, valTRCD, valSUBCD, valRemark, valAmt ], function(err, row){                              
                          isError = (err ? true : false );
                          errMsg = (err ? err.message : "");
                        });
                      }

                      if (isError) {
                        res.status(202).json({"message" : err.message, "error" : "Yes"});
                      } else {
                          //Close the previous bill
                          db.run("UPDATE VOUCHERS SET CLIND='Y' WHERE BILLID = ?", [ prevBillId ], function(err, row){                              
                            isError = (err ? true : false );
                            errMsg = (err ? err.message : "");
                          });
                        res.status(202).json({"message" : 'Bill Added successfully!', "error" : "No"});
                      }
                      db.close();
                      res.end();      
                  });
                });
            });
        });
      });
	   }
  });
});


//==============================================================================
// update the Bill
//==============================================================================
router.post('/update', function(req, res){
	var coCode = req.user.DEFAULT_CO;
  var billId = req.body.BILLID;
  var billNo = req.body.BILL_NO;
	var billDate = req.body.BILL_DT;
	var AcCode = req.body.AC_CODE;
  var TotAmt = req.body.TOT_AMT;
  var BillAmt = TotAmt ;
  var CloseIndic =  ((req.body.isClosed) ? "Y" : "N" ) ;// req.body.CLIND;
  var BillForYear = req.body.BILL_FOR_YEAR;
  var BillRemarks = req.body.REMARK;

  var TranData = req.body.transactions ;

  var isError = false;
  var errMsg = "" ;


	//if company does not exists
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
      isError = true;
      errMsg = err.message ;
  	} else {
		  db.get('SELECT 1 FROM VOUCHERS WHERE CO_CODE = ? AND BILLID = ?',  [coCode, billId], function(err, row) {
		    if (!row) {
          isError = true;
          errMsg = json({"message" : 'Cannot update ! Bill "' + billNo + '" does not exists!', "error" : "Yes"});
		    } else {
		    	var sqlstmt = `UPDATE VOUCHERS SET BILL_DT = ?, AC_CODE = ?, BILL_AMT = ? , TOT_AMT = ?, CLIND = ? , 
                         BILL_FOR_YEAR = ?, REMARK = ? WHERE CO_CODE = ? AND BILLID = ?` ;
		        db.run(sqlstmt, [ billDate, AcCode, BillAmt, TotAmt, CloseIndic, BillForYear, BillRemarks, coCode, billId ], function(err, row){
		            if (err){ 
                    isError = true;
                    errMsg = err.message ;
		            } else {
                  var sqlstmt = "DELETE FROM TRANSACT  WHERE CO_CODE = ? AND BILLID = ?" ;
                  db.run(sqlstmt, [ coCode, billId], function(err, row){
                    if (err){ 
                        isError = true;
                        errMsg = err.message ;
                    } else {
                      db.serialize(function() {
                          for(var i=0; i< TranData.length; i++){
                            var valTRCD = TranData[i].TRCD ;
                            var valSUBCD = TranData[i].SUBCD ;
                            var valRemark = TranData[i].REMARKS ;
                            var valAmt = TranData[i].BILL_AMT ;
                            var sqlstmt = "INSERT INTO TRANSACT (BILLID, CO_CODE, BILL_NO, BILL_DT, TRCD, SUBCD, REMARKS, BILL_AMT) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )" ;
                            db.run(sqlstmt, [ billId, coCode, billNo, billDate, valTRCD, valSUBCD, valRemark, valAmt ], function(err, row){                              
                              if (err){
                                  isError = true;
                                  errMsg = err.message ;
                              } else {
                                  isError = false;
                              } 
                            });
                          }
                        });
                      db.close();
                    }
                  });
		            }
		        });
		    }
		  });
  		}
	});

  if (isError) {
    res.status(202).json({"message" : err.message, "error" : "Yes"});
  } else {
    res.status(202).json({"message" : 'Bill update successfully!', "error" : "No"});
  }

  res.end();

});


//===============================================================
// Delete Bill
// You can delete only when there is no Party available.
//================================================================
router.post('/delete/:Id', (req, res, next) => {
	var parId = req.params.Id ;
  var coCode = 0 ;
  var AcCode = "" ;
  var lastBillId = "" ;
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	   if (err) {
		    res.status(202).json({"message" : err.message, "error" : "Yes"})
  	  } else {
        var sqlstmt1 = "DELETE FROM VOUCHERS WHERE BILLID = ?" ;
        var sqlstmt2 = "DELETE FROM TRANSACT WHERE BILLID = ?" ;
        //check if bill is closed
        db.get("SELECT CO_CODE, AC_CODE, LASTBILLID FROM VOUCHERS WHERE BILLID = ?", [parId] , function(err, row){
            coCode = row.CO_CODE ;
            AcCode = row.AC_CODE ;
            lastBillId = row.LASTBILLID ;
            //serch for last closed bill
//            console.log(row.LASTBILLID);
            if(lastBillId != 0) {//last closed bill found 
              db.run("UPDATE VOUCHERS SET CLIND = 'N' WHERE CO_CODE= ? AND BILLID= ? AND CLIND = 'Y' ", [ coCode, lastBillId ] , function(err, row){
                if(!err) {
                  db.run(sqlstmt1, [ parId ] , function(err, row){
                      if (err){
                          res.status(202).json({"message" : err.message, "error" : "Yes"});
                      } else {
                        db.run(sqlstmt2, [ parId ] , function(err, row){
                            if (err){
                                res.status(202).json({"message" : err.message, "error" : "Yes"});
                            } else {
                                res.status(202).json({"message" : "Bill deleted successfully !" , "error" : "No"});
                            }
                            db.close();
                            res.end();
                        });
                      }
                  });
                }
              });
            } else { //last closed bill not found 
              db.run(sqlstmt1, [  parId ] , function(err, row){
                if (err){
                  res.status(202).json({"message" : err.message, "error" : "Yes"});
                } else {
                  db.run(sqlstmt2, [ parId ] , function(err, row){
                    if (err){
                      res.status(202).json({"message" : err.message, "error" : "Yes"});
                    } else {
                      res.status(202).json({"message" : "Bill deleted successfully !" , "error" : "No"});
                    }
                    db.close();
                    res.end();
                  });
                }
              });

            }
        });
      }  
  });
});


//=================================================================================
// Get list of all trcds
//=================================================================================
router.get('/trcdlist', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
      db.close();
  	} 
   		db.all("SELECT DESC AS TRCDDESC FROM TRCD ", [], (err, rows) => {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows);	
        	}
          db.close();
    	});
	});
});


//=================================================================================
// Get Trcd code by its name 
//=================================================================================
router.get('/currentTrcdID/:Nm', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT TRCD FROM TRCD WHERE DESC = ?", [ req.params.Nm ], (err, rows) => {
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
// Get list of all trcdsubs 
//=================================================================================
router.get('/trcdsublist', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT A.TRCD, A.DESC AS TRCDSUBDESC FROM TRCDSUB A ", [], (err, rows) => {
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
// Get subcd code by its name and trcd separted by | (pipe)
//=================================================================================
router.post('/currentSUBCDIDp', (req, res, next) => {
  var subcdname = req.body.subcdnm ;
  var trcd = req.body.trcdid  ;
  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message) ; 
    } 
      db.all("SELECT SUBCD FROM TRCDSUB WHERE DESC = ? AND TRCD = ?", [subcdname, trcd ], (err, rows) => {
          if (err) {
            res.json(err.message);
          } else {
            if (!rows)
              res.json( {"SUBCD" : "Incorrect Name"}) ;
            else {
              res.json(rows[0]);  
            }
          }
      });
  });
    db.close();
});


/*
router.get('/currentSUBCDID/:Id', (req, res, next) => {
	var parstr = req.params.Id ;
	var parArr = parstr.split("|") ;
	var subcdname = parArr[0] ;
	var trcd = parArr[1] ;

	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT SUBCD FROM TRCDSUB WHERE CO_CODE = ? AND DESC = ? AND TRCD = ?", [req.user.DEFAULT_CO, subcdname, trcd ], (err, rows) => {
        	if (err) {
        		res.json(err.message);
        	} else {
        		if (!rows)
        			res.json( {"SUBCD" : "Incorrect Name"}) ;
        		else {
        			res.json(rows[0]);	
        		}
        	}
    	});
	});
    db.close();
});
*/




//=================================================================================
// Get list of all parties
//=================================================================================
router.get('/partylist', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT AC_NAME FROM ACC_MAST", [], (err, rows) => {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows);	
        	}
          db.close();
    	});
	});
});


//=================================================================================
// Get Party code by its name 
//=================================================================================
router.get('/currentPartyID/:Nm', (req, res, next) => {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT AC_CODE FROM ACC_MAST WHERE AC_NAME = ?", [req.params.Nm ], (err, rows) => {
        	if (err) {
        		res.json(err.message);
        	} else {
        		if (!rows)
        			res.json({"AC_CODE" : "Invalid Value"}) ;
        		else {
        			res.json(rows[0]);	
        		}
        	}
          db.close();
    	});
	});
});


//=================================================================================
// Get Party Name by its code 
//=================================================================================
router.get('/currentPartyNm/:Id', (req, res, next) => {
  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message) ; 
    } 
      db.all("SELECT AC_NAME FROM ACC_MAST WHERE AC_CODE = ?", [req.params.Id ], (err, rows) => {
          if (err) {
            res.json(err.message);
          } else {
            if (!rows)
              res.json( {"AC_NAME" : "Invalid Value"}) ;
            else {
              res.json(rows[0]);  
            }
          }
        db.close();
      });
  });
});


//=================================================================================
// Export / import utilities
//=================================================================================
//returns if the bill no is valid
var IsValidBill = function (coCode, billNo, billDate, callback ) {
  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      return callback(null,0) ;
    } 
      db.get("SELECT BILLID FROM VOUCHERS WHERE CO_CODE = ? AND BILL_NO = ? AND BILL_DT = ?", [coCode, billNo, billDate ], (err, rows) => {
            if (!rows)
                return callback(null, 0) ;
            else {
              return callback(null,rows.BILLID) ;
            }
          db.close();
      });
  });
};


function ValidateBillData(objBill, callback) {
  //Check Party Code exist
  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    //res.json({"IsValidData" : false, "message" : err.message}) ; 
    return callback(null,false) ;
  } else { 
    db.get("SELECT AC_CODE FROM ACC_MAST WHERE AC_CODE = ?", [objBill.AC_CODE ], (err, rows) => {
      if (!rows) {
        db.close();
        return callback(null,false) ;
      } else {
        var rtnVal = true ;
        db.serialize(function() {
          var TranData = objBill.Transactions
          var sqlstmt = "SELECT COUNT(*) AS CNT FROM ("
          for(var i=0; i< TranData.length; i++){
            var valTRCD = TranData[i].TRCD ;
            var valSUBCD = TranData[i].SUBCD ;
            if (i==0) {
              sqlstmt = sqlstmt +  " SELECT SUBCD FROM TRCDSUB WHERE TRCD = '" + valTRCD + "' AND SUBCD = '" + valSUBCD + "' " ;
            } else {
              sqlstmt = sqlstmt +  " UNION ALL SELECT SUBCD FROM TRCDSUB WHERE TRCD = '" + valTRCD + "' AND SUBCD = '" + valSUBCD + "'" ; 
            }
          }
          sqlstmt = sqlstmt + ")";
          db.get(sqlstmt, [ ], function(err, row){ 
            if (!row) {
              //res.json( {"IsValidData" : false, "message" : "Incorrect TRCD or SUBCD !" }) ;
              rtnVal = false ;
            } else {
              rtnVal = ((TranData.length ==  row.CNT) ? true : false )
            }
            db.close();
            return callback(null,rtnVal) ;
          });        
        });
      }
    });
  }
});
}


//===============================================================================
// Create bill from Imported Data
//===============================================================================
router.post('/billimport', (req, res, next) => {
  var billData = req.body ;

  if(billData.ACT == "Add") {
      ValidateBillData(billData,  (err, RtnValue) => {
      if(RtnValue) {
        // Code to Add new bill
        let db = new sqlite3.Database(config.database, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
            res.status(500).json({"message" : err.message, "error" : "Yes"});
          } else {
            db.serialize(function() {
              //Get the newBill ID
              db.get('SELECT MAX(BILLID)+1 AS NEWBILLID FROM VOUCHERS',  [ ], function(err, row) {
                var billId = row.NEWBILLID ;
                var billYear = getFinYear(new Date(billData.BILL_DATE));
                //Get the newBill No
                db.get('SELECT MAX(CAST(BILL_NO AS LONG ))+1 AS NEWBILL_NO FROM VOUCHERS WHERE CO_CODE = ? AND YEAR = ?',  [ billData.CO_CODE, billYear], function(err, row) {
                  var billNo = ((!row) ? 1 : (!row.NEWBILL_NO) ? 1 : row.NEWBILL_NO) ;

                  var TranData = billData.Transactions ;
                  var TotAmt= 0 ;
                  for(var i=0; i< TranData.length; i++){
                    TotAmt = TotAmt + TranData[i].Amount ;
                  } 
                  var BillAmt = TotAmt ;
                  var prvBal = 0 ;
                  var prvBillId = "" ;
                  var prvBalRemark = "" ;

                  db.get("SELECT BILLID, BILL_NO, BILL_DT, (IFNULL(TOT_AMT,0) - IFNULL(RCPT_AMT,0)) AS BAL_AMT FROM VOUCHERS WHERE AC_CODE= ? AND IFNULL(CLIND, 'N') <> 'Y' AND CO_CODE= ? ", [ billData.AC_CODE, billData.CO_CODE], (err, rows) => {
                    if (!rows) {
                      prvBal = 0 ;
                    } else {
                      if (rows.BAL_AMT > 0) {
                        prvBal = rows.BAL_AMT ;
                        prvBillId = rows.BILLID ;
                        var PrevBalTran = {} ;
                        PrevBalTran.TRCD ="OST" ;  
                        PrevBalTran.SUBCD ="" ;  
                        PrevBalTran.REMARKS = "Bill No : " + rows.BILL_NO + " dtd :  " + rows.BILL_DT ; 
                        PrevBalTran.Amount = rows.BAL_AMT ;  
                        TranData.splice(0, 0, PrevBalTran);
                        TotAmt= TotAmt + prvBal ;
                        BillAmt = TotAmt ;
                      }
                    }
                    var sqlstmt = "INSERT INTO VOUCHERS (BILLID, CO_CODE, BILL_NO, BILL_DT, AC_CODE, BILL_AMT, TOT_AMT, YEAR, LASTBILLID) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )" ;                    
                    db.run(sqlstmt, [ billId, billData.CO_CODE, billNo, billData.BILL_DATE, billData.AC_CODE, BillAmt, TotAmt, billYear, prvBillId ], function(err, row){ 
                      db.serialize(function() {
                        isError =false; 
                        for(var i=0; i< TranData.length; i++){
                          var valTRCD = TranData[i].TRCD ;
                          var valSUBCD = TranData[i].SUBCD ;
                          var valRemark = TranData[i].REMARKS ;
                          var valAmt = TranData[i].Amount ;
                          var sqlstmt = "INSERT INTO TRANSACT (BILLID, CO_CODE, BILL_NO, BILL_DT, TRCD, SUBCD, REMARKS, BILL_AMT) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )" ;
                          db.run(sqlstmt, [ billId, billData.CO_CODE, billNo, billData.BILL_DATE, valTRCD, valSUBCD, valRemark, valAmt ], function(err, row){                              
                            isError = (err ? true : false );
                          });
                        }
                        if (isError) {
                          res.json( {"ResponseValue" : err.message}) ; 
                        } else {
                          //Close the previous bill
                          db.run("UPDATE VOUCHERS SET CLIND='Y' WHERE BILLID = ?", [ prvBillId ], function(err, row){                              
                            isError = (err ? true : false );
                            errMsg = (err ? err.message : "");
                          });
                          res.json( {"ResponseValue" : "Bill Created!"}) ; 
                        }
                      });
                    });
                  });                    
                });              
              });              
            });
          } 
        });              
      } else {
        res.json( {"ResponseValue" : "Errors in Data!"}) ;
      }  
    });
  } else {
    IsValidBill(billData.CO_CODE, billData.BILL_NO, billData.BILL_DATE, (err, response) => {
      var billid = response ;
      if(billid > 0) {
        if(billData.ACT == "Delete") {
            //code to delete the bill
            res.json( {"ResponseValue" : "Bill deleted!"}) ;
        } else {
            //code to update the bill
            ValidateBillData(billData,  (err, RtnValue) => {
              if(RtnValue) {
//                console.log("updating the bill");
                //Closed bill cannot be updated
                let db = new sqlite3.Database(config.database, sqlite3.OPEN_READWRITE, (err) => {
                  var sqlstmt = "SELECT 'X' FROM VOUCHERS WHERE CO_CODE = ? AND BILLID = ? AND CLIND = 'Y' " ;
                  db.get(sqlstmt, [billData.CO_CODE, billid ], function(err, row){ 
                    if (!row) {
                      var TotAmt= 0 ;
                      var TranData = billData.Transactions
                      for(var i=0; i< TranData.length; i++){
                        TotAmt = TotAmt + TranData[i].Amount ;
                      } 
                      var BillAmt = TotAmt ;
                      var sqlstmt = "UPDATE VOUCHERS SET BILL_AMT = ? , TOT_AMT = ? WHERE CO_CODE = ? AND BILLID = ?" ;
                        db.run(sqlstmt, [  BillAmt, TotAmt, billData.CO_CODE, billid], function(err, row){
                            if (err){ 
                                isError = true;
                                errMsg = err.message ;
                            } else {
                              //Delete transactions execpt Previous balance row.
                              var sqlstmt = "DELETE FROM TRANSACT WHERE CO_CODE = ? AND BILLID = ? AND TRCD <> 'OST' " ;
                              db.run(sqlstmt, [billData.CO_CODE, billid], function(err, row){
                                if (err){ 
                                    isError = true;
                                    errMsg = err.message ;
                                } else {
                                  db.serialize(function() {
                                      for(var i=0; i< TranData.length; i++){
                                        var valTRCD = TranData[i].TRCD ;
                                        var valSUBCD = TranData[i].SUBCD ;
                                        var valAmt = TranData[i].Amount ;
                                        var sqlstmt = "INSERT INTO TRANSACT (BILLID, CO_CODE, BILL_NO, BILL_DT, TRCD, SUBCD, BILL_AMT) VALUES ( ?, ?, ?, ?, ?, ?, ? )" ;
                                        db.run(sqlstmt, [billid, billData.CO_CODE, billData.BILL_NO, billData.BILL_DATE, valTRCD, valSUBCD, valAmt ], function(err, row){ 
//                                          console.log(valTRCD);
                                          if (err){
                                              isError = true;
                                              errMsg = err.message ;
//                                              console.log(errMsg);
                                          } else {
                                              isError = false;
                                          } 
                                        });
                                      }
                                    //update the voucher totals
                                    db.get("SELECT SUM(BILL_AMT) AS TOTAL FROM TRANSACT WHERE CO_CODE= ? AND BILLID = ?", [ billData.CO_CODE, billid ], function(err, row){
                                      billtotAmt = row.TOTAL ; 
                                      billtotAmt1 = row.TOTAL ; 

                                      db.run("UPDATE VOUCHERS SET BILL_AMT = ? , TOT_AMT = ? WHERE CO_CODE= ? AND BILLID = ?", [ billtotAmt, billtotAmt1 , billData.CO_CODE, billid ], function(err, row){ 
                                        isError = (err ? true : false );
                                        errMsg = (err ? err.message : "");
//                                        console.log("database Closed");
                                        db.close();
                                      });
                                    });
                                  });
                                }
                              });
                            }
                        });
                    } else {
                      res.json( {"ResponseValue" : "Closed Bill cannot be updated!"}) ;
                    }
                  });
                });
                res.json( {"ResponseValue" : "Bill updated!"}) ;
              } else {
                res.json( {"ResponseValue" : "Errors in Data!"}) ;
              }              
            });
        }
      } else {
        res.json( {"ResponseValue" : "Bill not found!"}) ; 
      }
    });
  }
});
  


function DefineColReg(objBill, callback) {
  var sqlstmt = `CREATE TABLE "COL_REG" ( 'CO_CODE' INTEGER, 'BILLID' NUMERIC UNIQUE ` ;
  let db = new sqlite3.Database(config.database, sqlite3.OPEN_READWRITE, (err) => {
    db.all(`SELECT (TRCD || '_' || CASE WHEN SUBCD='' THEN 'XXX' ELSE SUBCD END) AS COL_HEAD FROM TRCDSUB ORDER BY TRCD, SUBCD`, [ ], function(err, rows){
      var i = 0 ;
      rows.forEach((row) => {
        i++ ;
        sqlstmt = sqlstmt + ", '"  + row.COL_HEAD  + "' NUMERIC " 
        if(i==rows.length) {
          sqlstmt = sqlstmt + " , PRIMARY KEY('BILLID') )" ;
          db.run( "DROP TABLE COL_REG", [ ], function(err, rows){
            if(err){
//              console.log("Drop table failed!");
//              console.log(err);
              db.close();
              return callback(null, false) ;
            }else {
//              console.log(sqlstmt);
              db.run( sqlstmt, [ ], function(err, rows){
                db.close();
                if(err) {
                  console.log(err);
                  return callback(null, false) ;
                 } else {
                  return callback(null, true) ;
                }
              });              
            }
          });
        }
      });
    });
  });
};


function fillbillColReg(comCode, finYear, callback) {
    let db = new sqlite3.Database(config.database, sqlite3.OPEN_READWRITE, (err) => {
      db.run("INSERT INTO COL_REG (CO_CODE, BILLID) SELECT CO_CODE, BILLID FROM VOUCHERS WHERE CO_CODE=? AND YEAR = ?", [ comCode, finYear ], function(err, rows){
        if(err){
          return callback(null, false) ;
        } else {
          db.all("SELECT A.CO_CODE, A.BILLID, (A.TRCD || '_' || CASE WHEN A.SUBCD='' THEN 'XXX' ELSE A.SUBCD END) AS COL_HEAD, A.BILL_AMT FROM TRANSACT A, VOUCHERS B WHERE A.CO_CODE=B.CO_CODE AND A.BILLID = B.BILLID AND A.CO_CODE= ? AND B.YEAR = ?", [ comCode, finYear ], function(err, rows){
            db.serialize(function() {
              var i = 0 //rows.length;
              rows.forEach((row) => {
                var billId = row.BILLID ;
                var fldname = row.COL_HEAD
                var sqlstmt1 = "UPDATE COL_REG SET " + fldname + " = " + row.BILL_AMT + " WHERE CO_CODE = ? AND BILLID = ?"  ; 
                db.run(sqlstmt1, [ comCode, billId ], function(err, trow){
                  if(err) {
                    db.close();
                    return callback(null, false) ;
                  } else {
                    i++;
                    if(i==rows.length) {
                      db.close();
                      return callback(null, true) ;
                    }  
                  }
                });
              });
            });
          });
        }  
      });
    });
};


//help for csv writing : https://gist.github.com/nulltask/2056783
//====================================================================================
// Export bill Data
//==================================================================================
router.post('/billexport', (req, res, next) => {
  var coCode = req.body.CO_CODE ;
  var fyear = req.body.YEAR ;

  let db = new sqlite3.Database(config.database, sqlite3.OPEN_READWRITE, (err) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/csv');
    var csvrowhdr = "CO_CODE|BILLID|BILL_NO|BILL_DT|AC_NAME|AC_CODE|TRCD_CODE|AMT" + endOfLine ; 
    var sqlstmt = `SELECT A.BILLID, A.CO_CODE, SUBSTR('0000'|| A.BILL_NO, -4, 4) AS BILL_NO , A.BILL_DT
                  , A.AC_CODE, B.AC_NAME , (C.TRCD || '_' || C.SUBCD) AS TRCD_CODE 
                  , case when C.BILL_AMT is null then 0 else C.BILL_AMT end as BILL_AMT 
                  FROM VOUCHERS A, ACC_MAST B, TRANSACT C 
                  WHERE A.AC_CODE=B.AC_CODE AND C.CO_CODE=A.CO_CODE 
                  AND C.BILLID=A.BILLID AND A.CO_CODE= ? AND A.YEAR= ? ORDER BY 2,1` ;
    db.all(sqlstmt, [coCode , fyear ], function(err, rows){
      if(err) {
        db.close();
        res.write("no data found");
        res.end();
      } else {
        if(rows.length == 0) {
          db.close();
          res.write("no data found");
          res.end();
        } else {
          res.write(csvrowhdr);
          var dataline = "" ;
          k=0;
          rows.forEach((row) => {                
            k++;
            dataline = row.CO_CODE + "|" + row.BILLID + "|" + row.BILL_NO + "|" + row.BILL_DT + "|" + row.AC_NAME + "|" + row.AC_CODE + "|" + row.TRCD_CODE + "|" + row.BILL_AMT + endOfLine ; 
            res.write(dataline);
            if(k==rows.length) {
              res.end();
            }
          });
        }
      }
    });
  });
});


router.post('/billhdrexport', (req, res, next) => {
  var coCode = req.body.CO_CODE ;
  var fyear = req.body.YEAR ;

  let db = new sqlite3.Database(config.database, sqlite3.OPEN_READWRITE, (err) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/csv');
    var csvrowhdr = "TRANCODE|TRCD|SUBCD|DESC|SUBDESC" + endOfLine ; 
    var sqlstmt = `SELECT DISTINCT (C.TRCD || '_' || D.SUBCD) AS TRANCODE, C.TRCD, D.SUBCD, C.DESC , D.DESC AS SUBDESC
             FROM VOUCHERS A,  TRANSACT B , TRCD C, TRCDSUB D
             WHERE A.CO_CODE=A.CO_CODE AND A.BILLID=B.BILLID AND B.TRCD = C.TRCD
             AND B.TRCD<>'OST'
             AND D.TRCD=B.TRCD AND D.SUBCD=B.SUBCD
             AND A.CO_CODE= ? AND A.YEAR= ?
             ORDER BY 1, 2` ;
    db.all(sqlstmt, [coCode , fyear ], function(err, rows){
      if(err) {
        db.close();
        res.write("no data found");
        res.end();
      } else {
        if(rows.length == 0) {
          db.close();
          res.write("no data found");
          res.end();
        } else {
          res.write(csvrowhdr);
          var dataline = "" ;
          k=0;
          rows.forEach((row) => {                
            k++;
            dataline = row.TRANCODE + "|" + row.TRCD + "|" + row.SUBCD + "|" + row.DESC + "|" + row.SUBDESC  + endOfLine ; 
            res.write(dataline);
            if(k==rows.length) {
              res.end();
            }
          });
        }
      }
    });
  });
});




/*
//help for csv writing : https://gist.github.com/nulltask/2056783
router.post('/billexport_old', (req, res, next) => {
  var coCode = req.body.CO_CODE ;
  var fyear = req.body.YEAR ;
  DefineColReg(req.body,  (err, RtnValue) => {
    if(RtnValue) {
      fillbillColReg(coCode, fyear,  (err, RtnVal) => {
        if(RtnVal) {
            //write code to create CSV file
          let db = new sqlite3.Database(config.database, sqlite3.OPEN_READWRITE, (err) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/csv');
            //header row
            var csvrowhdr = "CO_CODE, BILL_NO, BILL_DT, AC_NAME, AC_CODE "
            db.all(`SELECT (TRCD || '_' || CASE WHEN SUBCD='' THEN 'XXX' ELSE SUBCD END) AS COL_HEAD FROM TRCDSUB ORDER BY TRCD, SUBCD`, [ ], function(err, rows){
              console.log(rows.length);              
              k=0;
              rows.forEach((row) => {                
                csvrowhdr = csvrowhdr + "," + row.COL_HEAD; 
                k++;
                if(k==rows.length) {
                  csvrowhdr = csvrowhdr + endOfLine ; //'\r\n'    
                }
              });
              db.all("SELECT A.CO_CODE AS CCODE, B.BILL_NO, B.BILL_DT, C.AC_NAME, B.AC_CODE, A.* FROM COL_REG A, VOUCHERS B, ACC_MAST C WHERE A.CO_CODE=B.CO_CODE AND A.BILLID=B.BILLID AND B.AC_CODE = C.AC_CODE", [ ], function(err, trows){ 
                if(err) {
                  db.close();
                  res.write("no data found");
                  res.end();
                } else {
                  res.write(csvrowhdr);
                  i=0;
                  trows.forEach((trow) => {
                    //var csvrow = trow.CO_CODE + "," +  trow.BILL_NO + "," +  trow.BILL_DT + "," + trow.AC_NAME + "," + trow.AC_CODE  
                    var csvrow = "" ;
                    for (var key in trow) {
                        if(key != "CO_CODE") {
                           if(key != "BILLID") {
                            //console.log((trow[key] == null));
                            var fldval = ((trow[key] == null) ? "0" : trow[key]);
                            csvrow = csvrow + fldval + ","
                           }
                        }
                        //console.log("Key: " + key);
                        //console.log("Value: " + trow[key]);
                    }
                    csvrow = csvrow + endOfLine ;
                    res.write(csvrow);

                    i++;
                    if(i==trows.length) {
                      db.close();
                      res.end() ;
                    }  
                  });
                }
              });
            });
          });            
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/csv');
          res.write("no data found");
          res.end();
        }
      });      
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/csv');
      res.write("no data found");
      res.end();
    }
  });
});

*/

//======================================================================
//Send Bill email to clients
//=====================================================================

router.post('/billsemail', (req, res, next) => {
  console.log('sending emails');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.creatXOAuth2Generator({
          user: 'nitin.tandel16@gmail.com',
          clientId: '857597703416-5gs7tb40dduvr4pa8j97anmqqjml1p79.apps.googleusercontent.com',
          clientSecret: 'xT-ed_l4-wX_6uiYJdNNpUcM',
          refreshToken: ''
        })
    }
  });


  var mailOptions = {
    from: 'nitin.tandel16@gmail.com',
    to: 'nitin_tandel16@yahoo.com',
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
  }


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.json( error) ; 
    } else {
      console.log('Email sent: ' + info.response);
      res.json( {"ResponseValue" : "sent emails!"}) ; 
    }
  });

});




module.exports = router;
