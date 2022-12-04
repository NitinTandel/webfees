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
        res.render('billreg');
    } else {
      res.render('noaccess');
    }
});



router.post('/billsdata', (req, res, next) => {
//  console.log(req.user.DEFAULT_CO);
  //if all companies flag  then get list for all companies
  var coCode = req.body.CO_CODE ;
  var fyear = req.body.YEAR ;

  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message) ; 
    } 
      db.all(`SELECT A.BILLID, A.CO_CODE, SUBSTR('0000'|| A.BILL_NO, -4, 4) AS BILL_NO , A.BILL_DT
             , B.GRP_CODE , A.AC_CODE, B.AC_NAME , C.TRCD  
             , SUM(IFNULL(C.BILL_AMT, 0)) AS BILLAMT 
             , A.CLIND , IFNULL(A.TDS_AMT, 0) AS TDS_AMT
             , IFNULL(A.RCPT_AMT, 0) AS RCPTAMT, RCPT_DATE 
             , GROUP_CONCAT(C.TRCD || C.SUBCD) AS TRANLIST  
             FROM VOUCHERS A, ACC_MAST B, TRANSACT C 
             WHERE A.AC_CODE=B.AC_CODE AND C.CO_CODE=A.CO_CODE AND C.BILLID=A.BILLID 
             AND A.CO_CODE= ? AND A.YEAR= ?
             GROUP BY A.BILLID, A.CO_CODE, SUBSTR('0000'|| A.BILL_NO, -4, 4), A.BILL_DT, A.AC_CODE, B.AC_NAME , C.TRCD , A.RCPT_AMT, RCPT_DATE
             ORDER BY 2,1` , [coCode , fyear], (err, rows) => {
          if (err) {
            res.json(err.message);
          } else {
            res.json(rows);
          }
      });
  });
    db.close();
});


router.post('/billsdatasubcd', (req, res, next) => {
  var coCode = req.body.CO_CODE ;
  var fyear = req.body.YEAR ;

  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message) ; 
    } 
      db.all(`SELECT A.BILLID, A.CO_CODE, SUBSTR('0000'|| A.BILL_NO, -4, 4) AS BILL_NO , A.BILL_DT
             , B.GRP_CODE, A.AC_CODE, B.AC_NAME , C.TRCD, C.SUBCD, (C.TRCD || C.SUBCD) as TRANCODE
             , SUM(IFNULL(C.BILL_AMT, 0)) AS BILLAMT 
             , A.CLIND , IFNULL(A.TDS_AMT, 0) AS TDS_AMT
             , IFNULL(A.RCPT_AMT, 0) AS RCPTAMT, RCPT_DATE 
             FROM VOUCHERS A, ACC_MAST B, TRANSACT C 
             WHERE A.AC_CODE=B.AC_CODE AND C.CO_CODE=A.CO_CODE AND C.BILLID=A.BILLID 
             AND A.CO_CODE= ? AND A.YEAR= ?
             GROUP BY A.BILLID, A.CO_CODE, SUBSTR('0000'|| A.BILL_NO, -4, 4), A.BILL_DT, A.AC_CODE, B.AC_NAME , C.TRCD, C.SUBCD , RCPTAMT, RCPT_DATE
             ORDER BY 2,3` , [coCode , fyear], (err, rows) => {
          if (err) {
            res.json(err.message);
          } else {
            res.json(rows);
          }
      });
  });
    db.close();
});



router.post('/headernames', async (req, res, next) => {
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
             AND A.CO_CODE= ? AND A.YEAR= ?
             ORDER BY 1` , [coCode , fyear], (err, rows) => {
          if (err) {
            res.json(err.message);
          } else {
            res.json(rows);
          }
      });
  });
    db.close();
});


router.post('/headersubcds', async (req, res, next) => {
  var coCode = req.body.CO_CODE ;
  var fyear = req.body.YEAR ;

  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message) ; 
    } 
      db.all(`SELECT DISTINCT (C.TRCD || D.SUBCD) AS TRANCODE, C.TRCD, D.SUBCD, C.DESC , D.DESC AS SUBDESC
             FROM VOUCHERS A,  TRANSACT B , TRCD C, TRCDSUB D
             WHERE A.CO_CODE=A.CO_CODE AND A.BILLID=B.BILLID AND B.TRCD = C.TRCD
             AND B.TRCD<>'OST'
             AND D.TRCD=B.TRCD AND D.SUBCD=B.SUBCD
             AND A.CO_CODE= ? AND A.YEAR= ?
             ORDER BY 1, 2` , [coCode , fyear], (err, rows) => {
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


