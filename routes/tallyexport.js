var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
//var config = require('../config');
var config = require( '/webfees/config');

var request = require('request');

//var nodemailer = require('nodemailer');
//var xoauth2 = require('xoauth2');

let db1 =  new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {

});

var strCostCentre = `<TALLYMESSAGE xmlns:UDF="TallyUDF">
     <COSTCENTRE NAME="<<PARTY_NAME>>" RESERVEDNAME="">
      <GUID>AVSolution-<<PARTY_CODE>></GUID>
      <PARENT/>
      <CATEGORY>Primary Cost Category</CATEGORY>
      <REVENUELEDFOROPBAL>No</REVENUELEDFOROPBAL>
      <ISUPDATINGTARGETID>No</ISUPDATINGTARGETID>
      <ASORIGINAL>Yes</ASORIGINAL>
      <AFFECTSSTOCK>No</AFFECTSSTOCK>
      <FORPAYROLL>No</FORPAYROLL>
      <FORJOBCOSTING>No</FORJOBCOSTING>
      <ISEMPLOYEEGROUP>No</ISEMPLOYEEGROUP>
      <SORTPOSITION> 1000</SORTPOSITION>
      <LANGUAGENAME.LIST>
       <NAME.LIST TYPE="String">
        <NAME><<PARTY_NAME>></NAME>
        <NAME><<PARTY_CODE>></NAME>
       </NAME.LIST>
      </LANGUAGENAME.LIST>
     </COSTCENTRE>
    </TALLYMESSAGE>` ;

var strXMLHeader = `<ENVELOPE>
 <HEADER>
  <TALLYREQUEST>Import Data</TALLYREQUEST>
 </HEADER>
 <BODY>
  <IMPORTDATA>
   <REQUESTDESC>
    <REPORTNAME>All Masters</REPORTNAME>
    <STATICVARIABLES>
     <SVCURRENTCOMPANY><<TALLY_CO_NAME>></SVCURRENTCOMPANY>
    </STATICVARIABLES>
   </REQUESTDESC>
   <REQUESTDATA> ` ;

var strXMLFooter = `</REQUESTDATA></IMPORTDATA></BODY></ENVELOPE>`

var strXMLRcptTran = `<TALLYMESSAGE xmlns:UDF="TallyUDF">
     <VOUCHER REMOTEID="<<REMOTE_ID>>" VCHTYPE="Receipt" ACTION="ALTER" OBJVIEW="Accounting Voucher View">
      <DATE><<RCPT_DATE>></DATE>
      <GUID><<TALLY_GUID>></GUID>
      <NARRATION>For Bill No: <<BILL_NO>> Dtd : <<BILL_DT>></NARRATION>
      <VOUCHERTYPENAME>Receipt</VOUCHERTYPENAME>
      <VOUCHERNUMBER><<RCPT_NO>></VOUCHERNUMBER>
      <PARTYLEDGERNAME><<CASH_BANK_LEDGER>></PARTYLEDGERNAME>
      <PERSISTEDVIEW>Accounting Voucher View</PERSISTEDVIEW>
      <ISOPTIONAL>No</ISOPTIONAL>
      <EFFECTIVEDATE><<RCPT_DATE>></EFFECTIVEDATE>
      <ALTERID> 145</ALTERID>
      <ISCANCELLED>No</ISCANCELLED>
      <HASCASHFLOW>Yes</HASCASHFLOW>
      <ISPOSTDATED>No</ISPOSTDATED>
      <MASTERID> 48</MASTERID>
      <VOUCHERKEY><<VOUCHER_KEY>></VOUCHERKEY>
      <ALLLEDGERENTRIES.LIST>
       <LEDGERNAME><<FEES_LEDGER>></LEDGERNAME>
       <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
       <LEDGERFROMITEM>No</LEDGERFROMITEM>
       <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
       <ISPARTYLEDGER>No</ISPARTYLEDGER>
       <ISLASTDEEMEDPOSITIVE>No</ISLASTDEEMEDPOSITIVE>
       <AMOUNT><<RCPT_AMOUNT>></AMOUNT>
       <CATEGORYALLOCATIONS.LIST>
        <CATEGORY>Primary Cost Category</CATEGORY>
        <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
        <COSTCENTREALLOCATIONS.LIST>
         <NAME><<PARTY_NAME>></NAME>
         <AMOUNT><<RCPT_AMOUNT>></AMOUNT>
        </COSTCENTREALLOCATIONS.LIST>
       </CATEGORYALLOCATIONS.LIST>
      </ALLLEDGERENTRIES.LIST>
      <ALLLEDGERENTRIES.LIST>
       <LEDGERNAME><<CASH_BANK_LEDGER>></LEDGERNAME>
       <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
       <LEDGERFROMITEM>No</LEDGERFROMITEM>
       <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
       <ISPARTYLEDGER>Yes</ISPARTYLEDGER>
       <ISLASTDEEMEDPOSITIVE>Yes</ISLASTDEEMEDPOSITIVE>
       <AMOUNT>-<<RCPT_AMOUNT>></AMOUNT>
      </ALLLEDGERENTRIES.LIST>
     </VOUCHER>
    </TALLYMESSAGE>`


function XMLstring(str) {
  var rtnstr =  str.replace(/&/g, "&amp;" ) ;
  rtnstr =  rtnstr.replace(/'/g, "&apos;" ) ;
  rtnstr =  rtnstr.replace(/"/g, "&quot;" ) ;
    return rtnstr;
}


//=================================================================================
// render pages
//=================================================================================
router.get('/', function(req, res, next){
    if (req.isAuthenticated()) {
        res.render('tallyexport');
    } else {
      res.render('noaccess');
    }
});


//=================================================================================
// Get list of all Tally config for the current company
//=================================================================================
router.get('/TallyCoConfig', (req, res, next) => {
  var coCode = req.user.DEFAULT_CO ;

  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message) ; 
    } 
      db.get("SELECT CO_CODE, COMPANY, TALLY_CO_NAME, TALLY_CASH_LEDGER, TALLY_BANK_LEDGER FROM COMPANY WHERE CO_CODE= ?", [coCode], (err, row) => {
          if (err) {
            res.json(err.message);
          } else {
            res.json(row); 
          }
      });
  });
  db.close();
});


//=================================================================================
// Get list of all Tally config Details
//=================================================================================
router.get('/TallyConfig', (req, res, next) => {
  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message) ; 
    } 
      db.all("SELECT * FROM av_config WHERE config_field LIKE 'TALLY%' ", [], (err, rows) => {
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
//Update Tally Server Value
//=================================================================================
router.post('/UpdateTServer', (req, res, next) => {
  var tServerVal = req.body.TALLYSERVER;
  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
    if (!err) {
      var sqlstmt = "UPDATE av_config SET config_value_str = ? WHERE config_field = 'TALLYSERVER'" ;
      db.run(sqlstmt, [ tServerVal ], function(err, row){       
        if (err){
          res.status(202).json({"message" : "Database Error ! not able to Tally server value.", "error" : "Yes"});
        } else {
          res.status(202).json({"message" : 'Tally Server Value saved successfully!', "error" : "No"});
        }
        db.close();
        res.end();
      });
    } else {
      res.status(202).json({"message" : "Database Error ! not able to Tally server value.", "error" : "Yes"});
    }
  });
});


//=================================================================================
//Send Party name as Cost Centers  to Tally
//=================================================================================
router.post('/SendCCtoTally', (req, res, next) => {
  var coCode = req.user.DEFAULT_CO ;
  var reExport  = req.body.reExport ;
  var partylist = req.body.partylist ;  
  var tallyURL = 'http://' + req.body.TALLYSERVER ; 
  var exportscope = req.body.exportscope ;

  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message) ; 
    } 

    db.get("SELECT CO_CODE, COMPANY, TALLY_CO_NAME FROM COMPANY WHERE CO_CODE= ?", [coCode], (err, coInfo) => {
      var sqlstmt = `SELECT A.AC_CODE, A.AC_NAME, B.GRP_NAME FROM ACC_MAST A, GROUP_MAST B 
              WHERE A.GRP_CODE=B.GRP_CODE AND A.TALLY_EXP_FLG <> 9 
              <<SELECTED_PARTIES>> ` ;

      if(exportscope == 2) {
        sqlstmt = sqlstmt.replace(/<<SELECTED_PARTIES>>/g, 'AND A.AC_CODE IN ' + partylist ) ;    
      } else {
        sqlstmt = sqlstmt.replace(/<<SELECTED_PARTIES>>/g, ' ' ) ;    
      }       
      
      db.all(sqlstmt, [ ], (err, accInfo) => {
        var strTallyXML = strXMLHeader ;
        strTallyXML = strTallyXML.replace(/<<TALLY_CO_NAME>>/g, XMLstring(coInfo.TALLY_CO_NAME)) ;

        for(var i=0; i < accInfo.length ; i++) {
            var strTran = strCostCentre ;
            strTran = strTran.replace(/<<PARTY_NAME>>/g, XMLstring(accInfo[i].AC_NAME)); 
            strTran = strTran.replace(/<<PARTY_CODE>>/g, XMLstring(accInfo[i].AC_CODE)); 
            strTallyXML = strTallyXML + strTran ;
        }            
        strTallyXML = strTallyXML + strXMLFooter ;
        db.close();        

        request.post(
            {url : tallyURL,
            body : strTallyXML,
            headers: {'Content-Type': 'text/xml'}
            },
            function (error, response, body) {        
                if (!error && response.statusCode == 200) {
                  res.status(202).json({"message" : 'Data exported successfully!', "error" : "No"});
                } else {
                  res.status(202).json({"message" : "Error while exporting data!", "error" : "Yes"});
                }
                res.end();
            }
        );
      });
    });
  });
});



//=================================================================================
// Get list of Receipts to be exported
//=================================================================================
router.post('/rcptexpdata', (req, res, next) => {
  var coCode = req.user.DEFAULT_CO ;
  var fdt = req.body.FROM_DT ;
  var tdt = req.body.TO_DT ;
  var reExport  = req.body.reExport ;
  var datascope = req.body.datascope ;
  var partylist = req.body.partylist ;  
  var grplist = req.body.grouplist ; 

  var sqlstmt = `SELECT A.CO_CODE,
                  CASE WHEN CASH1 > 0 THEN 'R1CSH-' || SUBSTR('0000'|| A.BILL_NO, -4, 4) ELSE 'R1CHQ-' || SUBSTR('0000'|| A.BILL_NO, -4, 4) END AS RCPT_NO, 
                  A.RCPT_DATE, A.BILLID, A.AC_CODE, B.AC_NAME, A.BILL_NO, A.BILL_DT, A.TOT_AMT,  CASH1, CHEQUE1 , (CASH1 + CHEQUE1 ) AS RCPT_AMOUNT, TALLY_EXP_FLG1 AS TALLY_FLG, 1 AS TALLY_FLG_TYPE
                  FROM VOUCHERS A, ACC_MAST B
                  WHERE A.AC_CODE= B.AC_CODE AND A.RCPT_DATE BETWEEN '<<FROM_DT>>' AND '<<TO_DT>>'
                  AND A.CO_CODE = <<CO_CODE>>
                  AND CASH1 + CHEQUE1 > 0
                  <<CHECKTALLYFLAG1>>
                  <<SPECIFICGROUPOPTION>>
                  <<SPECIFIC_PARTYOPTION>>
                  UNION 
                  SELECT A.CO_CODE, 
                  CASE WHEN A.CASH2 > 0 THEN 'R2CSH-' || SUBSTR('0000'|| A.BILL_NO, -4, 4) ELSE 'R2CHQ-' || SUBSTR('0000'|| A.BILL_NO, -4, 4) END AS RCPT_NO,
                  A.RCPT_DATE2, A.BILLID, A.AC_CODE, B.AC_NAME, A.BILL_NO, A.BILL_DT, A.TOT_AMT, CASH2, CHEQUE2 , (CASH2 + CHEQUE2 ) AS RCPT_AMOUNT, TALLY_EXP_FLG2 AS TALLY_FLG, 2 AS TALLY_FLG_TYPE
                  FROM VOUCHERS A, ACC_MAST B
                  WHERE A.AC_CODE = B.AC_CODE AND A.RCPT_DATE2 BETWEEN '<<FROM_DT>>' AND '<<TO_DT>>'
                  AND CASH2 + CHEQUE2 > 0
                  AND A.CO_CODE = <<CO_CODE>>
                  <<CHECKTALLYFLAG2>>
                  <<SPECIFICGROUPOPTION>>
                  <<SPECIFIC_PARTYOPTION>>
                  ORDER BY 1, 7` ;

  sqlstmt = sqlstmt.replace(/<<FROM_DT>>/g, fdt ) ;
  sqlstmt = sqlstmt.replace(/<<TO_DT>>/g, tdt ) ;
  sqlstmt = sqlstmt.replace(/<<CO_CODE>>/g, coCode ) ;
  sqlstmt = sqlstmt.replace(/<<SPECIFIC_PARTYOPTION>>/g, '' ) ;


  if(reExport) {
    sqlstmt = sqlstmt.replace(/<<CHECKTALLYFLAG1>>/g, '' ) ;
    sqlstmt = sqlstmt.replace(/<<CHECKTALLYFLAG2>>/g, '' ) ;
  } else {
    sqlstmt = sqlstmt.replace(/<<CHECKTALLYFLAG1>>/g, 'AND (TALLY_EXP_FLG1 <> 9 OR TALLY_EXP_FLG1 IS NULL)' ) ;
    sqlstmt = sqlstmt.replace(/<<CHECKTALLYFLAG2>>/g, 'AND (TALLY_EXP_FLG2 <> 9 OR TALLY_EXP_FLG2 IS NULL)' ) ;
  }

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


//=================================================================================
// Get list of Receipts Data to Tally
//=================================================================================
router.post('/SendtoTally', (req, res, next) => {
  var coCode = req.user.DEFAULT_CO ;
//  var fdt = req.body.FROM_DT ;
//  var tdt = req.body.TO_DT ;
//  var reExport  = req.body.reExport ;
//  var datascope = req.body.datascope ;
//  var partylist = req.body.partylist ;  
//  var grplist = req.body.grouplist ; 
//  var tallyURL = 'http://' + req.body.TALLYSERVER ; 
  var rcptData = req.body ;

  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message) ;
      db.close(); 
    } else {
      db.get("SELECT CONFIG_VALUE_STR FROM av_config  WHERE config_field = 'TALLYSERVER'", [], (err, TServerInfo) => {
        var tallyURL = 'http://' + TServerInfo.config_value_str ; 

        db.get("SELECT CO_CODE, COMPANY, TALLY_CO_NAME, TALLY_CASH_LEDGER, TALLY_BANK_LEDGER, FEES_LEDGER FROM COMPANY WHERE CO_CODE= ?", [coCode], (err, coInfo) => {
            if (err) {
              res.json(err.message);
            } else {
              var strTallyXML = strXMLHeader ;
              strTallyXML = strTallyXML.replace(/<<TALLY_CO_NAME>>/g, XMLstring(coInfo.TALLY_CO_NAME)) ;
              var strTallyCashLed = XMLstring(coInfo.TALLY_CASH_LEDGER) ;
              var strTallyBankLed = XMLstring(coInfo.TALLY_BANK_LEDGER) ;
              var strTallyFeesLed = XMLstring(coInfo.FEES_LEDGER) ;
              var remoteId = 'AVS_GUID_' + rcptData.BILLID + rcptData.RCPT_NO ;
              var strTran = strXMLRcptTran ;
              strTran = strTran.replace(/<<REMOTE_ID>>/g, remoteId); 
              strTran = strTran.replace(/<<RCPT_DATE>>/g, rcptData[i].RCPTDT); 
//              strTran = strTran.replace(/<<RCPT_DATE>>/g, '20180401');         
              strTran = strTran.replace(/<<TALLY_GUID>>/g, remoteId); 
              strTran = strTran.replace(/<<RCPT_NO>>/g, rcptData.RCPT_NO); 
              strTran = strTran.replace(/<<VOUCHER_KEY>>/g, rcptData.BILLID ); 
              strTran = strTran.replace(/<<BILL_NO>>/g, rcptData.BILL_NO); 
              strTran = strTran.replace(/<<BILL_DT>>/g, rcptData.BILL_DT); 
              strTran = strTran.replace(/<<FEES_LEDGER>>/g, strTallyFeesLed); 
              strTran = strTran.replace(/<<RCPT_AMOUNT>>/g, rcptData.RCPT_AMOUNT); 
              strTran = strTran.replace(/<<PARTY_NAME>>/g, XMLstring(rcptData.AC_NAME)); 

              if (rcptData.CASH_AMT != 0) {
                strTran = strTran.replace(/<<CASH_BANK_LEDGER>>/g, strTallyCashLed);   
              } else {
                strTran = strTran.replace(/<<CASH_BANK_LEDGER>>/g, strTallyBankLed); 
              }

              strTallyXML = strTallyXML + strTran + strXMLFooter ;

              var billid = rcptData.BILLID ;
              var flagType = rcptData.TALLY_FLG_TYPE ;
              if(flagType == 1) {
                var sqlUPDTstmt = "UPDATE VOUCHERS SET TALLY_EXP_FLG1 = 9 WHERE BILLID = " +  billid ;
              } else {
                var sqlUPDTstmt = "UPDATE VOUCHERS SET TALLY_EXP_FLG2 = 9 WHERE BILLID = " + billid ;
              }                              
              var postrequest = { url: tallyURL, body : strTallyXML, headers: {'Content-Type': 'text/xml'}};
                  request.post(postrequest ,function(err,resp){
                      console.log(resp.body);
                      if (!err){
                        db.run(sqlUPDTstmt, [ ], function(err, row){       
                          db.close();
                          res.status(202).json({"message" : 'Data exported successfully!', "error" : "No"});
                          res.end();
                        });
                      } else {                      
                        db.close();
                        res.status(202).json({"message" : "Error while exporting data!", "error" : "Yes"}); 
                        res.end();
                      }
                  });
            }
        });
      });
    }
  });
});




//================== For Exporting Full Data to Tally (which I am not currently using) =================


//=================================================================================
// Export all Data to Tally
//=================================================================================
router.post('/SendtoTallyFull', (req, res, next) => {
  var coCode = req.user.DEFAULT_CO ;
  var fdt = req.body.FROM_DT ;
  var tdt = req.body.TO_DT ;
  var reExport  = req.body.reExport ;
  var datascope = req.body.datascope ;
  var partylist = req.body.partylist ;  
  var grplist = req.body.grouplist ; 
  var tallyURL = 'http://' + req.body.TALLYSERVER ; 

  var sqlstmt = `SELECT A.BILLID, A.CO_CODE, A.BILLID, A.AC_CODE, B.AC_NAME, A.BILL_NO, A.BILL_DT, A.TOT_AMT, REPLACE(A.RCPT_DATE,'-','') AS RCPTDT, CASH1 AS CASH_AMT, CHEQUE1 AS CHQ_AMT , (CASH1 + CHEQUE1 ) AS RCPT_AMOUNT, TALLY_EXP_FLG1 AS TALLY_FLG, 1 AS TALLY_FLG_TYPE 
                  FROM VOUCHERS A, ACC_MAST B
                  WHERE A.AC_CODE= B.AC_CODE AND A.RCPT_DATE BETWEEN '<<FROM_DT>>' AND '<<TO_DT>>'
                  AND A.CO_CODE = <<CO_CODE>>
                  AND CASH1 + CHEQUE1 > 0
                  <<CHECKTALLYFLAG1>>
                  <<SPECIFICGROUPOPTION>>
                  <<SPECIFIC_PARTYOPTION>>
                  UNION 
                  SELECT A.BILLID, A.CO_CODE, A.BILLID, A.AC_CODE, B.AC_NAME, A.BILL_NO, A.BILL_DT, A.TOT_AMT, REPLACE(A.RCPT_DATE2, '-', '') AS RCPTDT, CASH2 AS CASH_AMT, CHEQUE2 AS CHQ_AMT, (CASH2 + CHEQUE2 ) AS RCPT_AMOUNT, TALLY_EXP_FLG2 AS TALLY_FLG, 2 AS TALLY_FLG_TYPE 
                  FROM VOUCHERS A, ACC_MAST B
                  WHERE A.AC_CODE = B.AC_CODE AND A.RCPT_DATE2 BETWEEN '<<FROM_DT>>' AND '<<TO_DT>>'
                  AND CASH2 + CHEQUE2 > 0
                  AND A.CO_CODE = <<CO_CODE>>
                  <<CHECKTALLYFLAG2>>
                  <<SPECIFICGROUPOPTION>>
                  <<SPECIFIC_PARTYOPTION>>
                  ORDER BY 1, 7 ` ;

  sqlstmt = sqlstmt.replace(/<<FROM_DT>>/g, fdt ) ;
  sqlstmt = sqlstmt.replace(/<<TO_DT>>/g, tdt ) ;
  sqlstmt = sqlstmt.replace(/<<CO_CODE>>/g, coCode ) ;
  sqlstmt = sqlstmt.replace(/<<SPECIFIC_PARTYOPTION>>/g, '' ) ;

  if(reExport) {
    sqlstmt = sqlstmt.replace(/<<CHECKTALLYFLAG1>>/g, '' ) ;
    sqlstmt = sqlstmt.replace(/<<CHECKTALLYFLAG2>>/g, '' ) ;
  } else {
    sqlstmt = sqlstmt.replace(/<<CHECKTALLYFLAG1>>/g, 'AND TALLY_EXP_FLG1 <> 9' ) ;
    sqlstmt = sqlstmt.replace(/<<CHECKTALLYFLAG2>>/g, 'AND TALLY_EXP_FLG2 <> 9' ) ;
  }

  if (req.body.datascope == 2 ) {
    sqlstmt = sqlstmt.replace(/<<SPECIFICGROUPOPTION>>/g , 'AND B.GRP_CODE IN ' + grplist ) ;  
  } else {
    sqlstmt = sqlstmt.replace(/<<SPECIFICGROUPOPTION>>/g , ''  ) ;  
  }

  let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      res.json(err.message) ; 
    } 
    db.get("SELECT CO_CODE, COMPANY, TALLY_CO_NAME, TALLY_CASH_LEDGER, TALLY_BANK_LEDGER, FEES_LEDGER FROM COMPANY WHERE CO_CODE= ?", [coCode], (err, coInfo) => {
          if (err) {
            res.json(err.message);
          } else {
            db.all(sqlstmt , [], (err, rcptData) => {
                if (err) {
                  res.json(err.message);
                } else {
                  posttoTally(tallyURL, coInfo, rcptData, (postresp) => {
                    if(postresp=="OK") {
                      res.status(202).json({"message" : 'Data exported successfully!', "error" : "No"});
                    } else {
                      res.status(202).json({"message" : "Error while exporting data!", "error" : "Yes"});
                    }
                    res.end();
                 });
                }
            });
          }
    });
  });
  db.close();
});


async function posttoTally(tallyURL, coInfo, rcptData, callback){
    var strTallyXML = strXMLHeader ;
    strTallyXML = strTallyXML.replace(/<<TALLY_CO_NAME>>/g, XMLstring(coInfo.TALLY_CO_NAME)) ;
    var strTallyCashLed = XMLstring(coInfo.TALLY_CASH_LEDGER) ;
    var strTallyBankLed = XMLstring(coInfo.TALLY_BANK_LEDGER) ;
    var strTallyFeesLed = XMLstring(coInfo.FEES_LEDGER) ;

//    let db =  new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, (err) => {
      for(var i=0; i < rcptData.length ; i++) {
        var remoteId = 'AVS_GUID_' + rcptData[i].BILLID 
        var strTran = strXMLRcptTran ;
        strTran = strTran.replace(/<<REMOTE_ID>>/g, remoteId); 
  //    strTran = strTran.replace(/<<RCPT_DATE>>/g, rcptData[i].RCPTDT); 
        strTran = strTran.replace(/<<RCPT_DATE>>/g, '20180401'); 
        
        strTran = strTran.replace(/<<TALLY_GUID>>/g, remoteId); 

        var rcptno = "R" ;
        strTran = strTran.replace(/<<BILL_NO>>/g, rcptData[i].BILL_NO); 
        if (rcptData[i].CASH_AMT != 0) {
          strTran = strTran.replace(/<<CASH_BANK_LEDGER>>/g, strTallyCashLed);   
          rcptno = rcptno + "CSH_" ;
        } else {
          strTran = strTran.replace(/<<CASH_BANK_LEDGER>>/g, strTallyBankLed); 
          rcptno = rcptno + "CSH_" ;
        }
        rcptno = rcptno + rcptData[i].BILL_NO
        strTran = strTran.replace(/<<RCPT_NO>>/g, rcptno); 
        strTran = strTran.replace(/<<VOUCHER_KEY>>/g, rcptData[i].BILLID ); 
        strTran = strTran.replace(/<<FEES_LEDGER>>/g, strTallyFeesLed); 
        strTran = strTran.replace(/<<RCPT_AMOUNT>>/g, rcptData[i].RCPT_AMOUNT); 
        strTran = strTran.replace(/<<PARTY_NAME>>/g, XMLstring(rcptData[i].AC_NAME)); 
        strTallyXML = strTallyXML + strTran + strXMLFooter ;

        var billid = rcptData[i].BILLID ;
        var flagType = rcptData[i].TALLY_FLG_TYPE ;
        if(flagType == 1) {
          var sqlUPDTstmt = "UPDATE VOUCHERS SET TALLY_EXP_FLG1 = 9 WHERE BILLID = " +  billid ;
        } else {
          var sqlUPDTstmt = "UPDATE VOUCHERS SET TALLY_EXP_FLG2 = 9 WHERE BILLID = " + billid ;
        }                              
        var postrequest = { url: tallyURL, body : strTallyXML, headers: {'Content-Type': 'text/xml'}};
//        let tallyresp = await request.post(postrequest) ;
        let tallyresp = await tallypostreq(postrequest) ;
        var isupdated = false ;
        var rtnval = tallyresp.body ;
        var n = rtnval.search("<CREATED>1</CREATED>");
        if(n == -1) {
          var n = rtnval.search("<ALTERED>1</ALTERED>");  
        }

        if( n != -1 ) {
            await db1.runAsync(sqlUPDTstmt);
        } else {
          console.log(tallyresp.body) ;
        }
      } 
      callback("OK") ;
}


tallypostreq = function(req){
    return new Promise(function (resolve, reject) {
      request.post(req,function(err,resp){
            if (err)
                reject(err);
            else
                resolve(resp);
        });
    });
}



//Database update function with await 
db1.runAsync = function (sql) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.run(sql, function (err, row) {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
};






module.exports = router;


