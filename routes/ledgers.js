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
        res.render('ledgers');
    } else {
      res.render('noaccess');
    }

});


router.post('/ledgerdata', (req, res, next) => {
//  console.log(req.user.DEFAULT_CO);
  //if all companies flag  then get list for all companies
  var coCode = req.body.CO_CODE ;
  var fyear = req.body.YEAR ;
  var fdt = req.body.FROM_DT ;
  var tdt = req.body.TO_DT ;
  var datascope = req.body.datascope ;
  var partylist = req.body.partylist ;

  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message) ; 
    } 
      var sqlstmt = `SELECT A.AC_CODE, B.AC_NAME, '<<FROM_DT>>' AS TRAN_DT, 'Opening Balance ... ' AS TRAN, 0 AS BILL_AMOUNT, 0 AS RCPT_AMOUNT,  CASE WHEN  A.CLIND ='Y' THEN 0 ELSE  SUM( IFNULL(TOT_AMT,0) - IFNULL(RCPT_AMT,0) ) END AS BAL_AMT , 'N' AS CLIND
              FROM VOUCHERS A, ACC_MAST B
              WHERE A.AC_CODE = B.AC_CODE 
              AND A.BILL_DT < '<<FROM_DT>>'
              AND A.RCPT_DATE < '<<FROM_DT>>'
              AND A.RCPT_DATE2 < '<<FROM_DT>>'
              AND A.CO_CODE = <<CO_CODE>>
              <<SELECTED_PARTIES>>
              GROUP BY A.AC_CODE, 'Opening Balance ... '
              UNION 
              SELECT A.AC_CODE, B.AC_NAME, A.BILL_DT AS TRAN_DT, 'Bill No : ' || A.BILL_NO AS TRAN, A.TOT_AMT AS BILL_AMOUNT, 0 AS RCPT_AMOUNT , 0 AS BAL_AMT, A.CLIND
              FROM VOUCHERS A, ACC_MAST B
              WHERE A.AC_CODE = B.AC_CODE 
              AND A.CO_CODE = <<CO_CODE>>
              AND A.BILL_DT BETWEEN '<<FROM_DT>>' AND '<<TO_DT>>'
              <<SELECTED_PARTIES>>
              UNION
              SELECT A.AC_CODE, B.AC_NAME, A.RCPT_DATE  AS TRAN_DT, 'Receipt'  AS TRAN, 0 AS BILL_AMOUNT, A.CASH1 + A.CHEQUE1 AS  RCPT_AMOUNT , 0 AS BAL_AMT, A.CLIND
              FROM VOUCHERS A, ACC_MAST B
              WHERE A.AC_CODE = B.AC_CODE 
              AND A.CO_CODE = <<CO_CODE>>
              AND A.CASH1 + A.CHEQUE1 > 0
              AND A.RCPT_DATE BETWEEN '<<FROM_DT>>' AND '<<TO_DT>>'
              <<SELECTED_PARTIES>>
              UNION
              SELECT A.AC_CODE, B.AC_NAME,  A.RCPT_DATE2  AS TRAN_DT, 'Receipt'  AS TRAN, 0 AS BILL_AMOUNT, A.CASH2 + A.CHEQUE2 AS  RCPT_AMOUNT , 0 AS BAL_AMT , A.CLIND
              FROM VOUCHERS A, ACC_MAST B
              WHERE A.AC_CODE = B.AC_CODE 
              AND A.CO_CODE = <<CO_CODE>>
              AND A.CASH2 + A.CHEQUE2 > 0
              AND A.RCPT_DATE2 BETWEEN '<<FROM_DT>>' AND '<<TO_DT>>'
              <<SELECTED_PARTIES>>
              ORDER BY 1, 3` ;

      sqlstmt = sqlstmt.replace(/<<FROM_DT>>/g, fdt ) ;
      sqlstmt = sqlstmt.replace(/<<TO_DT>>/g, tdt ) ;
      sqlstmt = sqlstmt.replace(/<<CO_CODE>>/g, coCode ) ;

      if (datascope == 2) {
        sqlstmt = sqlstmt.replace(/<<SELECTED_PARTIES>>/g, 'AND A.AC_CODE IN ' + partylist ) ;  
      } else {
        sqlstmt = sqlstmt.replace(/<<SELECTED_PARTIES>>/g, ''  ) ;  
      }
      
//      console.log(sqlstmt) ;

      db.all(sqlstmt , [ ], (err, rows) => {
          if (err) {
            console.log(err);
            res.json(err.message);
          } else {
//            console.log(rows);
            res.json(rows);

          }
      });
  });
    db.close();
});


router.post('/headernames', (req, res, next) => {
//  console.log(req.user.DEFAULT_CO);
  //if all companies flag  then get list for all companies
  var coCode = req.body.CO_CODE ;
  var fyear = req.body.YEAR ;

  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message) ; 
    } 
      db.all(`SELECT DISTINCT C.TRCD, C.DESC 
             FROM VOUCHERS A,  TRANSACT B , TRCD C
             WHERE A.CO_CODE=A.CO_CODE AND A.BILLID=B.BILLID AND B.TRCD = C.TRCD
             AND B.TRCD<>'OST'
             AND A.CO_CODE= ? AND A.YEAR= ?` , [coCode , fyear], (err, rows) => {
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
        db.get("SELECT USERID, YEAR, FROM_DT, TO_DT FROM USERS A, YEARS B WHERE A.DEFAULT_YEAR  = B.YEAR AND B.YEAR = ? ", [req.user.DEFAULT_YEAR], (err, rows) => {
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




module.exports = router;


