var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
var config = require( '/webfees/config');


//=================================================================================
// render pages
//=================================================================================
router.get('/', function(req, res, next){
    if (req.isAuthenticated()) {
        res.render('rcptreg');
    } else {
      res.render('noaccess');
    }
});


router.post('/rcptregdata', (req, res, next) => {
  var coCode = req.body.CO_CODE ;
  var fdt = req.body.FROM_DT ;
  var tdt = req.body.TO_DT ;
  var datascope = req.body.datascope ;
  var partylist = req.body.partylist ;  
  var grplist = req.body.grouplist ; 
  var RcptOption = req.body.RcptOption ; 

  var sqlstmt = `SELECT A.CO_CODE, A.BILLID, A.AC_CODE, B.AC_NAME, A.BILL_NO, A.TOT_AMT, A.RCPT_DATE, CASH1, CHEQUE1 , (CASH1 + CHEQUE1 ) AS RCPT_AMOUNT
                  FROM VOUCHERS A, ACC_MAST B
                  WHERE A.AC_CODE= B.AC_CODE AND A.RCPT_DATE BETWEEN '<<FROM_DT>>' AND '<<TO_DT>>'
                  AND A.CO_CODE = <<CO_CODE>>
                  AND CASH1 + CHEQUE1 > 0
                  <<SPECIFICRCPTTYPE1>>
                  <<SPECIFICGROUPOPTION>>
                  <<SPECIFIC_PARTYOPTION>>
                  UNION 
                  SELECT A.CO_CODE, A.BILLID, A.AC_CODE, B.AC_NAME,  A.BILL_NO, A.TOT_AMT, A.RCPT_DATE2, CASH2, CHEQUE2 , (CASH2 + CHEQUE2 ) AS RCPT_AMOUNT
                  FROM VOUCHERS A, ACC_MAST B
                  WHERE A.AC_CODE = B.AC_CODE AND A.RCPT_DATE2 BETWEEN '<<FROM_DT>>' AND '<<TO_DT>>'
                  AND CASH2 + CHEQUE2 > 0
                  AND A.CO_CODE = <<CO_CODE>>
                  <<SPECIFICRCPTTYPE2>>
                  <<SPECIFICGROUPOPTION>>
                  <<SPECIFIC_PARTYOPTION>>
                  ORDER BY 1, 7` ;

  sqlstmt = sqlstmt.replace(/<<FROM_DT>>/g, fdt ) ;
  sqlstmt = sqlstmt.replace(/<<TO_DT>>/g, tdt ) ;
  sqlstmt = sqlstmt.replace(/<<CO_CODE>>/g, coCode ) ;

  if(RcptOption == 1 ) {
    sqlstmt = sqlstmt.replace(/<<SPECIFICRCPTTYPE1>>/g, ' AND CASH1 > 0 ' ) ;
    sqlstmt = sqlstmt.replace(/<<SPECIFICRCPTTYPE2>>/g, ' AND CASH2 > 0 ' ) ;
  }

  if(RcptOption == 2 ) {
    sqlstmt = sqlstmt.replace(/<<SPECIFICRCPTTYPE1>>/g, ' AND CHEQUE1 > 0 ' ) ;
    sqlstmt = sqlstmt.replace(/<<SPECIFICRCPTTYPE2>>/g, ' AND CHEQUE2 > 0 ' ) ;
  }

  if(RcptOption == 3 ) {
    sqlstmt = sqlstmt.replace(/<<SPECIFICRCPTTYPE1>>/g, ' ' ) ;
    sqlstmt = sqlstmt.replace(/<<SPECIFICRCPTTYPE2>>/g, ' ' ) ;
  }

  sqlstmt = sqlstmt.replace(/<<SPECIFIC_PARTYOPTION>>/g, '' ) ;


  if (req.body.datascope == 2 ) {
    sqlstmt = sqlstmt.replace(/<<SPECIFICGROUPOPTION>>/g , 'AND B.GRP_CODE IN ' + grplist ) ;  
  } else {
    sqlstmt = sqlstmt.replace(/<<SPECIFICGROUPOPTION>>/g , ''  ) ;  
  }

  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message) ; 
    } 
      db.all(sqlstmt , [], (err, rows) => {
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


//=================================================================================
// Get list of all outstanding bills 
//=================================================================================
router.get('/listall', (req, res, next) => {
//	console.log(req.user.DEFAULT_CO);
  //if all companies flag  then get list for all companies
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all(`SELECT A.CO_CODE, A.BILLID, A.AC_CODE, B.AC_NAME,  A.BILL_NO, A.TOT_AMT, A.RCPT_DATE, CASH1, CHEQUE1 , (CASH1 + CHEQUE1 ) AS RCPT_AMOUNT
              FROM VOUCHERS A, ACC_MAST B
              WHERE A.AC_CODE= B.AC_CODE AND A.RCPT_DATE BETWEEN '2017-04-01' AND '2018-03-31'
              AND A.CO_CODE = 2
              AND CASH1 + CHEQUE1 > 0
              UNION 
              SELECT A.CO_CODE, A.BILLID, A.AC_CODE, B.AC_NAME,  A.BILL_NO, A.TOT_AMT, A.RCPT_DATE2, CASH2, CHEQUE2 , (CASH2 + CHEQUE2 ) AS RCPT_AMOUNT
              FROM VOUCHERS A, ACC_MAST B
              WHERE A.AC_CODE = B.AC_CODE AND A.RCPT_DATE2 BETWEEN '2017-04-01' AND '2018-03-31'
              AND CASH2 + CHEQUE2 > 0
              AND A.CO_CODE = 2
              ORDER BY 1, 7`, [ req.user.DEFAULT_CO], (err, rows) => {
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

                  db.get("SELECT BILLID, BILL_NO, BILL_DT, (TOT_AMT - RCPT_AMT) AS BAL_AMT FROM VOUCHERS WHERE AC_CODE= ? AND CLIND <> 'Y' AND CO_CODE= ? ", [ billData.AC_CODE, billData.CO_CODE], (err, rows) => {
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
                console.log("updating the bill");
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
                                          console.log(valTRCD);
                                          if (err){
                                              isError = true;
                                              errMsg = err.message ;
                                              console.log(errMsg);
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

                                        console.log("database Closed");
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
              db.close();
              return callback(null, false) ;
            }else {
              db.run( sqlstmt, [ ], function(err, rows){
                db.close();
                if(err) {
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
router.post('/billexport', (req, res, next) => {
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


//======================================================================
//Send Bill email to clients
//=====================================================================
router.post('/osemail', (req, res, next) => {
  console.log('sending emails for outstanding');

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

*/


module.exports = router;


