// Updated on : 21/8/2022

FeesApp.controller('billsCntrl', ['$scope', '$http' , '$q' , 'filterFilter', '$location' ,  function($scope, $http , $q, filterFilter , $location ) {
	$scope.pagetitle = "Manage Bills" 
	$scope.sortColumn = 'BILL_NO';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;
	$scope.currentIndex = -1 ;
	$scope.selectedBill = {} ;
	$scope.newBill = {} ;
	$scope.isbillschecked = false ;
	$scope.pageDataLoaded  = false ;

//  	$scope.filteredbills = {}; 
	$scope.subcdlist = {} ;
	$scope.selectedBillTran = {} ;
	$scope.selectedTran = {} ;
	$scope.newTranLine = {} ;

//	$scope.selectedbillDt = new Date();

	$scope.rowsubcdlist = [] ;
	$scope.transactionTotal = 0 ;


	// Bill Print page
	$scope.CompanyOption = "2" ;
	$scope.GroupOption = "1" ;

	var refresh = function() {
	  $http.get('/bills/listall').then(function(response) { 
	    $scope.billslist = response.data;
//	    $scope.filteredbills = $scope.billslist;
	  	$scope.pageDataLoaded  = true ;
	  });

	  $http.get('../groups/listall').then(function(response) { 
	    $scope.grouplist = response.data;
	  });
	  
	  $http.get('../company/allCoData').then(function(response) { 
	    $scope.allcompanyData = response.data;
	  });

	  $http.get('/bills/partylist').then(function(response) { 
	    $scope.partylist = response.data;
	  });

	  $http.get('/bills/trcdlist').then(function(response) { 
	    $scope.trcdlist = response.data;
	  });

	  $http.get('/bills/trcdsublist').then(function(response) { 
	    $scope.subcdlist = response.data;
	  });

	  $http.get('/company/yearslist').then(function(response) { 
	    $scope.yearlist = response.data;
	  });

	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;

//	  $scope.pageDataLoaded = true ;
//	  console.log("Hello world") ;
	};

	refresh();


//=============================================
// select / deselect  the filtered bills list
//=============================================
	$scope.selectAllBills = function() {
		for (var i =0 ; i < $scope.filteredbills.length ; i++){
			$scope.filteredbills[i].CHECKED = !($scope.isbillschecked) ;
		}
		$scope.isbillschecked = !($scope.isbillschecked) ;
	};


//=============================================
//Add new Bill
//============================================
    $scope.addBill = function addBill() {
      	$scope.rtnMessage="" ;
//      	var strtoday = formatDate(new Date()) ;
      	$scope.selectedBill.BILLID=0 ;
      	$scope.selectedBill.BILL_NO="" ;
      	$scope.selectedBill.BILL_DT= "";
      	$scope.selectedBill.AC_CODE="" ;
      	$scope.selectedBill.AC_NAME="" ;
      	$scope.selectedBill.BILL_AMT=0 ;
      	$scope.selectedBill.LASTBILLID=0 ;

      	$scope.selectedBill.isClosed=false ;
      	$scope.selectedBill.transactions = [] ;

	    $scope.selectedBill.isClosedOld = $scope.selectedBill.isClosed ;

    	$scope.transactionTotal = 0 ; // ($scope.selectedBill.TOT_AMT );
		$scope.selectedBill.selectedbillDt = new Date();

      	var newTransact = {} ;
      	newTransact.BILLID=0 ;  
      	newTransact.CO_CODE=0 ;  
      	newTransact.BILL_NO=0 ;  
      	newTransact.BILL_DT="" ;  
      	newTransact.TRCD="" ;  
      	newTransact.SUBCD="" ;  
      	newTransact.REMARKS="" ;  
      	newTransact.BILL_AMT=0 ;  

		$scope.selectedBill.transactions.push(newTransact);

		$scope.selectedBillTran = $scope.selectedBill.transactions;

      	$('#AddNewBill').modal();
    }

	$scope.registerNewbill = function(newbill) {
//		console.log(newbill);	
		$http.post('/bills/register', newbill).then(function(response) {	  	
		  	$scope.rtnMessage = response.data.message ;
		  	$scope.isRtnMsgErr = response.data.error ;
		  	$scope.transactionTotal = 0 ;
		    refresh();
	  		ShowSnackbar($scope.rtnMessage , 0) ;
		});
	};


//=============================================
//Edit the Bill
//============================================
    $scope.editThisBill = function editThisBill(row) {
	  	var selectedBillId = row.BILLID ;
	  	$http.get('/bills/billfulldata/' +  selectedBillId).then(function(response) { 
	    	$scope.selectedBill = response.data;

//	    	Find if the current bill is closed
	    	$scope.selectedBill.isClosed = (($scope.selectedBill.CLIND == "C") ? true : (($scope.selectedBill.CLIND == "Y") ? true : false));
//          Stores the old value to identify if the value is changed now
	    	$scope.selectedBill.isClosedOld = $scope.selectedBill.isClosed ;

    		$scope.transactionTotal = ($scope.selectedBill.TOT_AMT );
			$scope.selectedBill.selectedbillDt = new Date($scope.selectedBill.BILL_DT);

			$scope.selectedBillTran = $scope.selectedBill.transactions;

			//console.log($scope.selectedBillTran.length);
			// if no transactions exists then add new line
			if($scope.selectedBillTran.length == 0) {
				var newTranLines = {} ;
		    	newTranLines.BILLID=$scope.selectedBill.BILLID;
		    	newTranLines.CO_CODE=$scope.selectedBill.CO_CODE;
		    	newTranLines.BILL_NO=$scope.selectedBill.BILL_NO;
		    	newTranLines.BILL_DT=$scope.selectedBill.BILL_DT;
		    	newTranLines.TRCD="";
		    	newTranLines.TRCDDESC="";
		    	newTranLines.SUBCD="";
		    	newTranLines.SUBDESC="";
		    	newTranLines.REMARKS="";
		    	newTranLines.BILL_AMT=0;
    			$scope.selectedBillTran.push($scope.newTranLine);
			}

			var index = $scope.billslist.indexOf(row);
			 $scope.currentIndex = index ;
			    if (index !== -1) {
			      	$('#EditBill').modal();
			    }	
	  	});    	
    }

	$scope.modifyBill = function(sBilldata) {
	  $http.post('/bills/update', sBilldata).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  	ShowSnackbar($scope.rtnMessage , 0) ;
	  });
	};


//=============================================
//Delete the Bill
//============================================
    $scope.removeBill = function removeBill(row) {
    $scope.selectedBill = row ;
//	$scope.deleteCO_ID = row.CO_CODE ;
    var index = $scope.billslist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteBill').modal();
        }
    }

    $scope.deleteBill = function deleteBill(billtoDelete, currentIndex) {
        var id = "";
        if (currentIndex !== -1) {
       		 id = billtoDelete.BILLID
        	//First call http delete from database
			$http.get('/bills/details/' + id ).then(function(response) { 
			    var billClosedIndic = response.data.CLIND;
			    if(billClosedIndic != 'Y') {
					 $http.post('/bills/delete/' + id  , []).then(function(response) {
					    $scope.rtnMessage = response.data.message ;
				  		$scope.isRtnMsgErr = response.data.error ;
			            $scope.billslist.splice(currentIndex, 1);
					    refresh();
	  					ShowSnackbar($scope.rtnMessage , 0) ;

					});
			    } else {
					$scope.rtnMessage = "Closed bill cannot be deleted" ;
				  	$scope.isRtnMsgErr = true ;
	  				ShowSnackbar($scope.rtnMessage , 1) ;
			    }
			});
        }
    }



//=================================================================================================
//Print selected Bill
// Help : http://pdfmake.org/#/
//===============================================================================================
/*
$scope.PrintBillsaaa = function PrintBillsaaa() {
	console.log("print called !")
	var mypromise =  $scope.getBillsData();
	mypromise.then(function(response){
		console.log(response);
		console.log("pdf generated successfully!")
	});
}
*/


$scope.getBillsData =  async function getBillsData( printfromPage) {
	var delay = $q.defer();
	var urlcalls = [];

	if(printfromPage == 1 ) {  // From Make bills pages	

		for(var i=0; i < $scope.billslist.length ; i++){
			if($scope.billslist[i].CHECKED ){
				var selectedBillId = $scope.billslist[i].BILLID ;
				urlcalls.push($http.get('/bills/billfulldata/' + selectedBillId ) );
			}
		}
		
		$q.all(urlcalls)
			.then(function(response){
				//console.log("Added bill  to pdfdd" );			
				delay.resolve(response);
		})
	} else { // print from Print bill page
		var grouplist = []
		for(var i=0; i < $scope.grouplist.length ; i++){
			if($scope.grouplist[i].CHECKED ){
				grouplist.push($scope.grouplist[i].GRP_CODE )
			  }
		  }
	
		const options = {
			FOR_ALL_COMPANY : ($scope.CompanyOption == "1" ) ,
			FOR_ALL_GROUP : ($scope.GroupOption == "1"),
			GROUPLIST : grouplist
		
		}
		//$http.post('/bills/billinfo', options ).then(function(apidata){
		//	//console.log("Added bill  to pdfdd" );			
		//	console.log(apidata)
		//	delay.resolve(apidata);
		//})
		const apidata  = await $http.post('/bills/billinfo', options )
		delay.resolve(apidata.data);
		//console.log(options)
		//const apidata  = await $http.post('/bills/billinfo', options )
		//console.log(apidata)
	}

	return delay.promise;
}


$scope.PrintBills = async function PrintBills( printfromPage) {
	var win = window.open('', '_blank');
	var pdfdd = {} ;
	var delay = $q.defer();

	const QRCodeblank = getBase64Image(document.getElementById("imageQRCodeblank"));
	const QRCode2 = getBase64Image(document.getElementById("imageQRCode2"));
	const QRCode3 = getBase64Image(document.getElementById("imageQRCode3"));
	const QRCode5 = getBase64Image(document.getElementById("imageQRCode5"));
	const QRCode6 = getBase64Image(document.getElementById("imageQRCode6"));
	const QRCode7 = getBase64Image(document.getElementById("imageQRCode7"));

//	const apidata  = await $http.get('/bills/CurrentCoData')
//	const coData = apidata.data
	const blankdoc = JSON.stringify(ddSingleBill) ;

	pdfdd = JSON.parse(blankdoc);
	pdfdd.images.PymntQRCodeblank = "data:image/jpeg;base64," + QRCodeblank
	pdfdd.images.PymntQRCode2 = "data:image/jpeg;base64," + QRCode2
	pdfdd.images.PymntQRCode3 = "data:image/jpeg;base64," + QRCode3
	pdfdd.images.PymntQRCode5 = "data:image/jpeg;base64," + QRCode5
	pdfdd.images.PymntQRCode6 = "data:image/jpeg;base64," + QRCode6
	pdfdd.images.PymntQRCode7 = "data:image/jpeg;base64," + QRCode7
	
	const strsinglebillcontent = JSON.stringify(pdfdd.content[0])
	const strbillline = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[1])
	const strbillBlankLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[2])
	const strbillTotLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[3])
//	pdfdd = null
	
	var mypromise = $scope.getBillsData(printfromPage);
	
	mypromise.then(function(response){
//		console.log(response)
		billCount=0;
		for(var i=0; i < response.length ; i++){
//			mydoc = updateCompanyData(blankdoc, coData )
//			pdfdd = JSON.parse(mydoc);
			var cBilltoPrint =  response[i].data 

			//format headers in pdfdd document
			strBillContent = getBillHeaders(cBilltoPrint, cBilltoPrint.BILLID, strsinglebillcontent );	
				//repeat each transaction and format pdfdd document
				var billobj =  JSON.parse( strBillContent );
				var lineNo= 1 ;
				var itemNo= 1 ;
				for(var k=0; k < cBilltoPrint.transactions.length ; k++) {
						sline = cBilltoPrint.transactions[k];
						var tranName = sline.TRCDDESC
						tranName =   ((typeof sline.SUBDESC === "undefined") ? tranName : tranName + "-" + sline.SUBDESC);
						if (sline.TRCD == 'OST' ) {
							tranName = tranName + " [ " + sline.REMARKS + " ]";
						} 

						tranName = convertValidJSON(tranName);

						var strbline = "" ;
						strbline = strbillline ; 
						strbline = strbline.replace('<<LINE>>', itemNo.toString() );
						strbline = strbline.replace('<<BILL_TRAN>>', tranName);
						strbline = strbline.replace('<<TRAN_AMT>>', numberWithCommas(sline.BILL_AMT));

						billobj.table.body[2][0].table.body[lineNo] =  JSON.parse(strbline);

						if (sline.REMARKS != '' && sline.TRCD != 'OST' ) {
							lineNo++;

							var strbline = "" ;
							strbline = strbillline ; 
							strbline = strbline.replace('<<LINE>>', ' ' );
							strbline = strbline.replace('<<BILL_TRAN>>', '  * ' + convertValidJSON(sline.REMARKS));
							strbline = strbline.replace('<<TRAN_AMT>>', ' ');

							billobj.table.body[2][0].table.body[lineNo] =  JSON.parse(strbline);
						}
/*
						if(lineNo == 1){
							billobj.table.body[2][0].table.body[1] =  JSON.parse(strbline);
						} else {
							billobj.table.body[2][0].table.body.splice(2, 0, JSON.parse(strbline));
						}
*/
						itemNo++;
						lineNo++;
				}
					
				strBillContent = JSON.stringify(billobj);
//				console.log(billCount)			 
				if (billCount > 0) {
					var newbillcontent = JSON.parse(strBillContent);
					pdfdd.content.push(newbillcontent);
				} else {
					pdfdd.content[0] = JSON.parse(strBillContent);
				}
				billCount++;
		}
				
		// Custom table layout
		pdfMake.tableLayouts = {
		  billtblLayout: {
			hLineWidth: function (i, node) {
				return (i === 0 || i === node.table.body.length) ? 2 : 1;
			},
			vLineWidth: function (i, node) {
				return (i === 0 || i === node.table.widths.length) ? 2 : 1;
			},
			hLineColor: function (i, node) {
				return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
			},
			vLineColor: function (i, node) {
				return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
			}
		  }
		};

		pdfMake.createPdf(pdfdd).open({}, win);
	});  		

/*
	$http.get('/bills/CurrentCoData').then(function(response) {
	  	if (!response.data.CO_CODE) {
	  		$scope.isIncorrectGroup = true;
	  	} else {
	  		var coData = response.data ;
	  		$scope.isIncorrectGroup = false ;

		}
	});
*/
	
}


function updateCompanyData(ddBillformat, coData ) {
	let billdoc = ddBillformat

	billdoc = billdoc.replace(/<<CO_NAME>>/g, coData.COMPANY);
	billdoc = billdoc.replace(/<<CO_DESCR>>/g, coData.CO_DESCR);

	if(coData.CO_CODE == 3) {
		billdoc = billdoc.replace(/<<COMP_SIGN>>/g, 'Jeetu_Sign');
	} else if ( coData.CO_CODE == 5 ) {
		billdoc = billdoc.replace(/<<COMP_SIGN>>/g, 'Viral_Sign');
	} else {
		billdoc = billdoc.replace(/<<COMP_SIGN>>/g, 'jinal_sign');				
	}

	if(coData.CO_CODE == 2) {
		billdoc = billdoc.replace(/<<PYMNTQRCODE>>/g, 'PymntQRCode2');
	} else if ( coData.CO_CODE == 3 ) {
		billdoc = billdoc.replace(/<<PYMNTQRCODE>>/g, 'PymntQRCode3');
	} else if ( coData.CO_CODE == 5 ) {
		billdoc = billdoc.replace(/<<PYMNTQRCODE>>/g, 'PymntQRCode5');
	} else if ( coData.CO_CODE == 6 ) {
		billdoc = billdoc.replace(/<<PYMNTQRCODE>>/g, 'PymntQRCode6');
	} else if ( coData.CO_CODE == 7 ) {
		billdoc = billdoc.replace(/<<PYMNTQRCODE>>/g, 'PymntQRCode7');
	} else {
		billdoc = billdoc.replace(/<<PYMNTQRCODE>>/g, 'PymntQRCodeblank');				
	}

	
	var coAdd = " "
	coAdd = coAdd +  ((typeof coData.ADD1 === "undefined") ? "" : coData.ADD1);
	coAdd = coAdd +  ((typeof coData.ADD2 === "undefined") ? "" : ", " + coData.ADD2);
	coAdd = coAdd +  ((typeof coData.ADD3 === "undefined") ? "" : ", " + coData.ADD3);
	coAdd = coAdd +  ((typeof coData.CITY_DIST === "undefined") ? "" : " , Dist/City :" + coData.CITY_DIST);
	coAdd = coAdd +  ((typeof coData.STATE === "undefined") ? "" : ", " + coData.STATE);
	coAdd = coAdd +  ((typeof coData.PIN === "undefined") ? "" : ", PIN -" + coData.PIN);
	
	billdoc = billdoc.replace(/<<CO_ADD>>/g, coAdd);			
	var coPAN = (coData.PAN_NO == null ? " " : coData.PAN_NO);
	billdoc = billdoc.replace(/<<COPAN>>/g, coPAN);

	var coTel = " "
	coTel = coTel +  ((typeof coData.TEL1 === "undefined") ? "" : coData.TEL1);
	coTel = coTel +  ((typeof coData.TEL2 === "undefined") ? "" : "/" + coData.TEL2);

	coTel = coTel.substring(0,20);

	billdoc = billdoc.replace(/<<CO_TEL>>/g, coTel);
	coEmail = ((typeof coData.EMAIL === "undefined") ? "" : "Email : " + coData.EMAIL);
	billdoc = billdoc.replace(/<<CO_EMAIL>>/g, coEmail);

	var coBankNm = ((typeof coData.BANK_NAME === "undefined") ? "" : coData.BANK_NAME);
	var coBankType = ((typeof coData.AC_TYPE === "undefined") ? "" : coData.AC_TYPE);
	coBankNm = coBankNm + " [" + coBankType + " Account]";

	var coIFSC = ((typeof coData.IFSC_CODE === "undefined") ? "" : coData.IFSC_CODE);
	var coBankAcc = ((typeof coData.AC_NUM === "undefined") ? "" : coData.AC_NUM);

	billdoc = billdoc.replace('<<BANK_NAME>>', coBankNm );
	billdoc = billdoc.replace('<<IFSC>>', coIFSC );
	billdoc = billdoc.replace('<<BANK_ACC>>', coBankAcc );

	return 	billdoc
}


function getBillHeaders(cBilltoPrint, billId, blankBillContent  ){
	const filtdata = $scope.allcompanyData.filter(el => el.CO_CODE == cBilltoPrint.CO_CODE )
	const currentBillCompany = filtdata[0]

	blankBillContent = updateCompanyData(blankBillContent, currentBillCompany )
	
	const paymentref = cBilltoPrint.BILL_DT.substring(0,4) + cBilltoPrint.BILL_DT.substring(5,7) + cBilltoPrint.BILL_DT.substring(8,10) + "-" + cBilltoPrint.BILL_NO + "-" + cBilltoPrint.AC_CODE

	var rtnval = "" ;
	var billDate = "" ;
	    billDate =  cBilltoPrint.BILL_DT.substring(8,10) + "/" + cBilltoPrint.BILL_DT.substring(5,7) + "/" + cBilltoPrint.BILL_DT.substring(0,4);
		rtnval = blankBillContent;
		rtnval = rtnval.replace('<<BILL_NO>>', cBilltoPrint.BILL_NO);
		rtnval = rtnval.replace('<<BILL_DATE>>', billDate);

		var acname = convertValidJSON(cBilltoPrint.AC_NAME);

		rtnval = rtnval.replace('<<PARTY_NM>>', acname);

		var prtAdd1 = ((typeof cBilltoPrint.ADDRESS1 === "undefined") ? " " : cBilltoPrint.ADDRESS1);
		prtAdd1 = convertValidJSON(prtAdd1);

		rtnval = rtnval.replace('<<PARTY_ADD1>>', prtAdd1);
		var prtAdd2 = ((typeof cBilltoPrint.ADDRESS2 === "undefined") ? " " : cBilltoPrint.ADDRESS2);
		prtAdd2 = convertValidJSON(prtAdd2);
		rtnval = rtnval.replace('<<PARTY_ADD2>>', prtAdd2);

		var prtAdd3 = ((typeof cBilltoPrint.ADDRESS3 === "undefined") ? " " : cBilltoPrint.ADDRESS3);
		rtnval = rtnval.replace('<<PARTY_ADD3>>', prtAdd3);

		var prtAdd4 = ((typeof cBilltoPrint.ADDRESS4 === "undefined") ? " " : cBilltoPrint.ADDRESS4);	
		rtnval = rtnval.replace('<<PARTY_ADD4>>', prtAdd4);

		rtnval = rtnval.replace('<<PYMTNREF>>', paymentref);

//		var prtAdd3 = ((typeof cBilltoPrint.ADDRESS3 === "undefined") ? " " : cBilltoPrint.ADDRESS3);
//		prtAdd3 = prtAdd3 + ((typeof cBilltoPrint.ADDRESS4 === "undefined") ? "" : ", " + cBilltoPrint.ADDRESS4);
//		prtAdd3 = convertValidJSON(prtAdd3);
//		rtnval = rtnval.replace('<<PARTY_ADD3>>', prtAdd3);


//		var prtPAN = ((typeof cBilltoPrint.PAN1 === "undefined") ? " " : cBilltoPrint.PAN1);
//		rtnval = rtnval.replace('<<PARTY_PAN>>', prtPAN);
		var billYear = (!cBilltoPrint.BILL_FOR_YEAR  ? ' ' : cBilltoPrint.BILL_FOR_YEAR)

		rtnval = rtnval.replace(/<<BILL_FOR_YEAR>>/g, billYear);

		rtnval = rtnval.replace(/<<TOT_AMT>>/g, numberWithCommas(cBilltoPrint.TOT_AMT));
		var AmtinWords = "Rupees " + convertInWords(cBilltoPrint.TOT_AMT) + " Only.";
		rtnval = rtnval.replace('<<AMTINWORDS>>', AmtinWords);

		rtnval = rtnval.replace("<<RCPT_AMT>>", numberWithCommas(cBilltoPrint.RCPT_AMT));
		
		const balAmt =  cBilltoPrint.CLIND  == 'Y' ? 0 : cBilltoPrint.TOT_AMT - cBilltoPrint.RCPT_AMT
		const discountAmt = cBilltoPrint.CLIND  == 'Y' ? cBilltoPrint.TOT_AMT - cBilltoPrint.RCPT_AMT : 0

		rtnval = rtnval.replace("<<DISCOUNT_AMT>>", numberWithCommas(discountAmt));
		rtnval = rtnval.replace("<<BAL_AMT>>", numberWithCommas(balAmt));

		var BalAmtinWords = "Balance Payable : Rupees " + convertInWords(balAmt) + " Only.";
		rtnval = rtnval.replace('<<BALAMTINWORDS>>', BalAmtinWords);

		return rtnval;
}


function getBase64Image(img) {
	const canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	const ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);
	const dataURL = canvas.toDataURL("image/png");
	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}  

//==[End of : Print bills functions ]==================================================================

	$scope.updaterowsubcdlist = function updaterowsubcdlist(trcdid) {
		$scope.rowsubcdlist = [] ;
		for (var i =0 ; i < $scope.subcdlist.length ; i++){
			var item = $scope.subcdlist[i];
			if (item.TRCD == trcdid) {
				$scope.rowsubcdlist.push(item);
			}
		}
	} ;


//=============================================
//Get the Party Name  based on Party code
//============================================
$scope.getSelectedPrtName = function getSelectedPrtName(PartyID) {
    if(PartyID != "") {	
		$http.get('/bills/currentPartyNm/' + PartyID).then(function(response) {
		  	if (!response.data.AC_NAME) {
		  		$scope.isIncorrectGroup = true;
		  	}else {
		  		$scope.selectedBill.AC_NAME = response.data.AC_NAME ;
		  	}
		 });
	}	  
}


//=============================================
//Get the PartyCode code based on Party name
//============================================
    $scope.getSelectedPrtID = function getSelectedPrtID(PartyNm, action) {
    	if(PartyNm != "") {	
		  $http.get('/bills/currentPartyID/' + PartyNm).then(function(response) {
		  	if (!response.data.AC_CODE) {
		  		$scope.isIncorrectGroup = true;
		  	}else {
		  		$scope.selectedBill.AC_CODE = response.data.AC_CODE ;
		  		//if Action is Add then find previous balance and update the first row 
		  		if(action=="Add") {
//		  			console.log($scope.selectedBill.AC_CODE) ;
		  			$http.get('/bills/PreviousBal/' + $scope.selectedBill.AC_CODE).then(function(response) {
		  				if(!response.data.message) {
			  				$scope.selectedBill.transactions[0].TRCD="OST";
			  				$scope.selectedBill.transactions[0].TRCDDESC="Previous Balance";
			  				$scope.selectedBill.transactions[0].SUBCD="";
			  				$scope.selectedBill.transactions[0].SUBDESC="";
			  				$scope.selectedBill.transactions[0].REMARKS="Bill No : " + response.data.BILL_NO + " dtd :  " + response.data.BILL_DT ;
			  				$scope.selectedBill.transactions[0].BILL_AMT=response.data.BAL_AMT;
							$scope.selectedBill.LASTBILLID=response.data.BILLID ;
							$scope.selectedBill.TOT_AMT = response.data.BAL_AMT;
							$scope.transactionTotal = response.data.BAL_AMT;
							//console.log(response.data.BAL_AMT);
		  				}	
					});		  			
		  		}
		  		$scope.isIncorrectGroup = false ;
		  	}
		  });
    	}
    }



//=============================================
//Get the TRCDCode code based on TRCD name
//============================================
    $scope.getTRCDID = function getTRCDID(trcdNm, index) {
      var oldTRCD = $scope.selectedBillTran[index].TRCD ;
      if (trcdNm != "" ) {
		  $http.get('/bills/currentTrcdID/' + trcdNm).then(function(response) {
		  	if (!response.data.TRCD) {
		  		$scope.isIncorrectGroup = true;
		  	}else {
		  		$scope.selectedBillTran[index].TRCD = response.data.TRCD ; 	
		  		$scope.isIncorrectGroup = false ;
		  		$scope.updaterowsubcdlist($scope.selectedBillTran[index].TRCD);

		  		// if changed remove the subcd details
		  		if(oldTRCD != $scope.selectedBillTran[index].TRCD) {
		  			$scope.selectedBillTran[index].SUBCD="";
		  			$scope.selectedBillTran[index].SUBDESC="";
		  		}
		  	}
		  });
      }
    }


//=============================================
//Get the SubCDCode code based on TRCD ID and subcd name
//============================================
    $scope.getSUBCDID = function getSUBCDID(subcdnm, trcdid, index) {
      var id = 	subcdnm + '|' + trcdid ;

	 var paramdata = {} ; 
	 paramdata.subcdnm = subcdnm ;
	 paramdata.trcdid = trcdid ;

	  $http.post('/bills/currentSUBCDIDp', paramdata).then(function(response) {
	  	if (!response.data.SUBCD) {
	  		$scope.isIncorrectGroup = true;
	  	}else {
	  		$scope.selectedBillTran[index].SUBCD = response.data.SUBCD ; 	
	  		$scope.isIncorrectGroup = false ;
	  	}
	  });
    }


    $scope.addBillline = function addBillline(row) {
    	$scope.newTranLine = angular.copy(row) ;
    	$scope.newTranLine.TRCD="";
    	$scope.newTranLine.TRCDDESC="";
    	$scope.newTranLine.SUBCD="";
    	$scope.newTranLine.SUBDESC="";
    	$scope.newTranLine.REMARKS="";
    	$scope.newTranLine.BILL_AMT=0;
    	$scope.selectedBillTran.push($scope.newTranLine);
    }


    $scope.removeBillline = function removeBillline(row, index) {
    	$scope.selectedBillTran.splice(index, 1);
		$scope.getBillTotal(); 

			// if no transactions exists then add new line
			if($scope.selectedBillTran.length == 0) {
		    	$scope.newTranLine.BILLID=$scope.selectedBill.BILLID;
		    	$scope.newTranLine.CO_CODE=$scope.selectedBill.CO_CODE;
		    	$scope.newTranLine.BILL_NO=$scope.selectedBill.BILL_NO;
		    	$scope.newTranLine.BILL_DT=$scope.selectedBill.BILL_DT;
		    	$scope.newTranLine.TRCD="";
		    	$scope.newTranLine.TRCDDESC="";
		    	$scope.newTranLine.SUBCD="";
		    	$scope.newTranLine.SUBDESC="";
		    	$scope.newTranLine.REMARKS="";
		    	$scope.newTranLine.BILL_AMT=0;
    			$scope.selectedBillTran.push($scope.newTranLine);
			}
    }


	$scope.getBillTotal = function(){		
	    $scope.transactionTotal = 0;
	    for(var i = 0; i < $scope.selectedBillTran.length; i++){
	        $scope.transactionTotal += ($scope.selectedBillTran[i].BILL_AMT);
	    }
	    total = $scope.transactionTotal ;
/*
		$scope.selectedBill.TOT_GST = $scope.transactionTotal * 0.1;
		$scope.selectedBill.SGST = $scope.selectedBill.TOT_GST / 2;
		$scope.selectedBill.CGST = $scope.selectedBill.TOT_GST - $scope.selectedBill.SGST ;

		$scope.selectedBill.BILL_AMT= $scope.transactionTotal + $scope.selectedBill.TOT_GST  ;
		$scope.selectedBill.TOT_AMT= $scope.selectedBill.BILL_AMT +  $scope.selectedBill.PREV_BAL ;
*/
		$scope.selectedBill.BILL_AMT= total ;
		$scope.selectedBill.TOT_AMT= total ;
	}


	$scope.PrintCancel = function PrintCancel() {
		var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
		console.log(approotpath);
		window.open(approotpath,"_self");
	}
	

//=============================================
// List order by
//============================================
	$scope.orderByMe = function(x) {
    	if ( x === $scope.sortColumn ) {
    		$scope.sortReverse = $scope.sortReverse ? false : true;
    	} else {
    		$scope.sortColumn = x;	
    		$scope.sortReverse = false;
    	}
  	}

}]); 


//End of controller : BillsCntrl

