// Updated on : 21/8/2021

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
        res.render('fileindx');
    } else {
      res.render('noaccess');
    }
});


router.get('/filesdata/:id', (req, res, next) => {
  const dataoptions = req.params.id.split("-")
  const dataorder = dataoptions[0]
  const dataInactive = dataoptions[1]
  var orderbyCriteria = " 1, 3 "
  var inactiveCriteria = " AND STATUS = 1 "

  if(dataorder == 2) {
    orderbyCriteria = " 3 "
  }

  if(dataorder == 3) {
    orderbyCriteria = " 4 "
  }

  // if Inactive is included then get all data
  if(dataInactive == 1) {
    inactiveCriteria = " "
  }

  var sqlcommon =  `SELECT A.GRP_CODE, A.GRP_NAME, B.AC_CODE, B.AC_NAME FROM GROUP_MAST A, ACC_MAST B 
                 WHERE A.GRP_CODE=B.GRP_CODE ${inactiveCriteria}  ORDER BY ${orderbyCriteria}`

//  console.log(sqlcommon)

  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        res.json(err.message) ; 
    } else {
      db.all(sqlcommon, [ ], (err, rows) => {
        if (err) {
          db.close();
          res.json(err.message);
        } else {
          db.close();
          res.json(rows);
        }
      });  
    }
  });

  /*
  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        res.json(err.message) ; 
    } else {
      //Group wise 
      if(dataorder == 1) {
        db.all(`SELECT A.GRP_CODE, A.GRP_NAME, B.AC_CODE, B.AC_NAME FROM GROUP_MAST A, ACC_MAST B WHERE A.GRP_CODE=B.GRP_CODE ORDER BY 1 ,3`, [ ], (err, rows) => {

          if (err) {
              db.close();
              res.json(err.message);
            } else {
              db.close();
              res.json(rows);
            }
        });  
      }
      //File Number wise 
      if(dataorder == 2) {
        db.all(`SELECT A.GRP_CODE, A.GRP_NAME, B.AC_CODE, B.AC_NAME FROM GROUP_MAST A, ACC_MAST B  WHERE A.GRP_CODE=B.GRP_CODE ORDER BY 3 `, [ ], (err, rows) => {
            if (err) {
              db.close();
              res.json(err.message);
            } else {
              db.close();
              res.json(rows);
            }
        });  
      }
      //Party Name wise 
      if(dataorder == 3) {
        db.all(`SELECT A.GRP_CODE, A.GRP_NAME, B.AC_CODE, B.AC_NAME FROM GROUP_MAST A, ACC_MAST B  WHERE A.GRP_CODE=B.GRP_CODE ORDER BY 4 `, [ ], (err, rows) => {
            if (err) {
              db.close();
              res.json(err.message);
            } else {
              db.close();
              res.json(rows);
            }
        });  
      }
    } 
  });
  */
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
  

module.exports = router;


