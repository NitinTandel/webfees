var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
var config = require( '/webfees/config');


function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function formatDate(mdate) {
  var monthIndex = mdate.getMonth();
  var year = mdate.getFullYear();
  var day = mdate.getDate();

  console.log("formatdate");
  return year + '-' + pad(monthIndex + 1, 2) + '-' + pad(day, 2);
}


//=================================================================================
// render pages
//=================================================================================
router.get('/', function(req, res, next){
    if (req.isAuthenticated()) {
        res.render('enterreceipts');
    } else {
      res.render('noaccess');
    }
});


//=================================================================================
// Get list of all bills
//=================================================================================
router.get('/listall', (req, res, next) => {
//	console.log(req.user.DEFAULT_CO);
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
    	res.json(err.message) ; 
  	} 
		   db.all(`SELECT A.BILLID, A.CO_CODE, A.BILL_NO, A.BILL_DT, A.AC_CODE, B.AC_NAME, B.GRP_CODE
		   , IFNULL(A.TOT_AMT,0) AS TOT_AMT, IFNULL(A.RCPT_AMT,0) AS RCPT_AMT, IFNULL(A.TDS_AMT,0) AS TDS_AMT
		   , CASE WHEN A.CLIND = 'Y' THEN 0 ELSE (IFNULL(A.TOT_AMT,0) - IFNULL(A.RCPT_AMT, 0) - IFNULL(A.TDS_AMT, 0)) END AS BAL_AMT
		   , IFNULL(A.CLIND, 'N') AS CLIND 
            , SUBSTR('0000'|| A.BILL_NO, -4, 4) AS BILL_STR 
            FROM VOUCHERS A, ACC_MAST B  
            WHERE A.AC_CODE=B.AC_CODE 
            AND ((A.CLIND <> 'Y' OR A.CLIND IS NULL) OR A.YEAR= ? )
            AND A.CO_CODE = ? 
            ORDER BY B.GRP_CODE, A.AC_CODE `
        , [ req.user.DEFAULT_YEAR, req.user.DEFAULT_CO], (err, rows) => {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows);	
        	}
    	});
	});
    db.close();
});


router.get('/listallOS', (req, res, next) => {
  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message) ; 
    } 
      db.all(`SELECT A.BILLID, A.CO_CODE, A.BILL_NO, A.BILL_DT, A.AC_CODE, B.AC_NAME, B.GRP_CODE
			, IFNULL(A.TOT_AMT,0) AS TOT_AMT, IFNULL(A.RCPT_AMT,0) AS RCPT_AMT, IFNULL(A.TDS_AMT,0) AS TDS_AMT
			, CASE WHEN A.CLIND = 'Y' THEN 0 ELSE (IFNULL(A.TOT_AMT,0) - IFNULL(A.RCPT_AMT, 0) - IFNULL(A.TDS_AMT, 0)) END AS BAL_AMT
			, IFNULL(A.CLIND, 'N') AS CLIND 
            , SUBSTR('0000'|| A.BILL_NO, -4, 4) AS BILL_STR 
            FROM VOUCHERS A, ACC_MAST B  
            WHERE A.AC_CODE=B.AC_CODE 
            AND (A.CLIND <> 'Y' OR A.CLIND IS NULL)
            AND A.CO_CODE = ? 
            ORDER BY B.GRP_CODE, A.AC_CODE `
        , [ req.user.DEFAULT_CO], (err, rows) => {
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
   		db.all(`SELECT A.*, B.AC_NAME, B.ADDRESS1, B.ADDRESS2, B.ADDRESS3, B.ADDRESS4
				, (IFNULL(A.TOT_AMT,0) - IFNULL(A.RCPT_AMT, 0) - IFNULL(A.TDS_AMT, 0)) AS BAL_AMT 
				FROM VOUCHERS A, ACC_MAST B WHERE A.AC_CODE=B.AC_CODE AND A.BILLID = ? AND A.CO_CODE = ? ;`, 
				[ req.params.Id , req.user.DEFAULT_CO], (err, rows) => {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows[0]);	
        	}
    	});
	});
    db.close();
});


//==============================================================================
// update the Receipt
//==============================================================================
router.post('/update', function(req, res){
	var coCode = req.user.DEFAULT_CO;
  	var billId = req.body.BILLID;
  	var CloseIndic =  ((req.body.isClosed) ? "Y" : "N" ) ;

	  var rDt1 = ((!req.body.RcptDt1) ? ""  : formatDate(new Date(req.body.RcptDt1)));

  	var CashAmt1 = req.body.CASH1 ;
  	var ChqAmt1 = req.body.CHEQUE1 ;

	  var rDt2 = ((!req.body.RcptDt2) ? ""  : formatDate(new Date(req.body.RcptDt2)));
 
  	var CashAmt2 = req.body.CASH2 ;
  	var ChqAmt2 = req.body.CHEQUE2 ;


  	var TotaCashAmt = req.body.CASH ;
  	var TotalChqAmt = req.body.CHEQUE ;

	var tdsAmt = req.body.TDS_AMT ;
  	var TotalRcptAmt = req.body.RCPT_AMT ;

  	var isError = false;
  	var errMsg = "" ;

	//if company does not exists
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
		if (err) {
	      	isError = true;
	      	errMsg = err.message ;
  			  res.end();
	  	} else {
			var sqlstmt = 'UPDATE VOUCHERS SET RCPT_DATE = ?, CASH1 = ?, CHEQUE1 = ?, RCPT_DATE2 = ?, CASH2 = ?, CHEQUE2 = ?,  CASH = ? , CHEQUE = ? , RCPT_AMT = ?, TDS_AMT = ? , CLIND = ? WHERE BILLID = ? ' ;
			db.run(sqlstmt, [ rDt1, CashAmt1, ChqAmt1, rDt2, CashAmt2, ChqAmt2, TotaCashAmt, TotalChqAmt, TotalRcptAmt, tdsAmt, CloseIndic, billId ], function(err, row) {
          console.log(err);
			    if (!err) {
            res.status(202).json({"message" : 'Receipts updated successfully!', "error" : "No"});
			    } else {
            res.status(202).json({"message" : err.error, "error" : "Yes"});
	        }
          db.close();
          res.end();
	     });
		}
	});
});


module.exports = router;


