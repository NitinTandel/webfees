

FeesApp.controller('LedgerCntrl', ['$scope', '$http', '$rootScope', '$location',  function($scope, $http, $rootScope , $location ) {
	$scope.pagetitle = "Ledgers" 
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;
	$scope.selectedComp = {} ;

	var refresh = function() {
	  $http.get('../Parties/listall').then(function(response) { 
	    $scope.partylist = response.data;
	  });

	  $http.get('../billreg/CurrentYearData').then(function(response) {
		$scope.dtFromDate = new Date(response.data.FROM_DT) ;
		$scope.dtToDate = new Date(response.data.TO_DT) ;
	  });

	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();


//=================================================================================================
// Print ledger
// Help : http://pdfmake.org/#/
//===============================================================================================

$scope.PrintCancel = function PrintCancel() {
	var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
	console.log(approotpath);
	window.open(approotpath,"_self");
}


$scope.PrintLedger = function PrintLedger() {
	var processreport = true ;
	var selectioncount = 0 ;
	var dataOptions = JSON.parse('{"datascope" : 1, "grouplist" : "NA", "partylist" : "NA"}' ) ;

	if ($scope.ReportOption == 2) {
		var selLedstr = "(" ;
		for(var i=0; i < $scope.partylist.length ; i++){
		    if($scope.partylist[i].CHECKED ){
		    	selLedstr = selLedstr + "'" + $scope.partylist[i].AC_CODE + "'," ;
		    	selectioncount = selectioncount + 1 ;
		  	}
		  }
		if (selectioncount > 0) {
			selLedstr = selLedstr.substr(0, selLedstr.length - 1) + ")";
		}  else {
			selLedstr = "( 'NA' )";
		}
		dataOptions.datascope = 2  ; 
		dataOptions.partylist = selLedstr ;
	} 

	if($scope.ReportOption == 2 && selectioncount == 0 ) {
		processreport = false ;
	}

	if (processreport) {
		var win = window.open('', '_blank');
		var pdfdd = {} ;
		var paramdata = {} ; 
		var mydoc = JSON.stringify(ddLedger) ;
		pdfdd = JSON.parse(mydoc);

		$http.get('../bills/CurrentCoData').then(function(response) {
			if (!response.data.CO_CODE) {
			  	$scope.isIncorrectGroup = true;
			 } else {
				dataOptions.CO_CODE = response.data.CO_CODE ;
				dataOptions.CO_NAME = response.data.COMPANY ;
				dataOptions.FROM_DT = dateinYYYYMMDD($scope.dtFromDate) ;
				dataOptions.TO_DT = dateinYYYYMMDD($scope.dtToDate) ;

				var todaysDt = appToday() ;

				mydoc = mydoc.replace(/<<CO_NAME>>/g, dataOptions.CO_NAME);
				mydoc = mydoc.replace(/<<FROM_DT>>/g, dateinDDMMYYYY($scope.dtFromDate));
				mydoc = mydoc.replace(/<<TO_DT>>/g, dateinDDMMYYYY($scope.dtToDate));
				mydoc = mydoc.replace(/<<PRINT_DT>>/g, todaysDt);

				pdfdd = JSON.parse(mydoc);

				var accHdrLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[0]);
				var coHdrsLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[1]);
				var tranLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[2]);
				var totLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[3]);
				var blankLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[4]);

				$http.post('/ledgers/ledgerdata', dataOptions).then(function(response) {
					var trandata = response.data ;
//					console.log(trandata);
					var isPrintTotLine = false ;
					var curAcCode = " " ; 
					var balAmount = 0 ;
					var debitTotal = 0 ;
					var creditTotal = 0 ;
					for(var i=0; i < trandata.length ; i++){
						if(curAcCode != trandata[i].AC_CODE ) {
							//Add Account name line
							balAmount = trandata[i].BAL_AMT ;

							debitTotal = 0 ;
							creditTotal = 0 ;

							var dataln = ' ' ;				
							var dataln = accHdrLine.replace('<<AC_CODE>>', trandata[i].AC_CODE) ;
							dataln = dataln.replace('<<AC_NAME>>', trandata[i].AC_NAME ) ;
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(dataln));

							//Add Col Header line
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(coHdrsLine));
						}	

						//Add Data line
						balAmount = balAmount + trandata[i].BILL_AMOUNT - trandata[i].RCPT_AMOUNT ;

						var dataln = tranLine.replace('<<TRAN_DT>>', trandata[i].TRAN_DT) ;
						dataln = dataln.replace('<<NO>>', ' ') ;
						dataln = dataln.replace('<<PARTICULARS>>', trandata[i].TRAN) ;
						dataln = dataln.replace('<<BILL_AMT>>', trandata[i].BILL_AMOUNT) ;
						dataln = dataln.replace('<<RCPT_AMT>>', trandata[i].RCPT_AMOUNT) ;
						dataln = dataln.replace('<<BAL_AMT>>', balAmount) ;
						pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(dataln));


						debitTotal = debitTotal + trandata[i].BILL_AMOUNT ;
						creditTotal = creditTotal + trandata[i].RCPT_AMOUNT ;

						curAcCode = trandata[i].AC_CODE ; 
 
						//Add Total line
						isPrintTotLine = false ;
						if( i+1 == trandata.length) {
							isPrintTotLine = true ;
						} else {
//							console.log(curAcCode + " <> " + trandata[i+1].AC_CODE ) ;
							if(curAcCode != trandata[i+1].AC_CODE) {
								isPrintTotLine = true ;
							}
						}
//						console.log()	

						if(isPrintTotLine == true ) {
							//Add Total line
							var dataln = totLine.replace('<<BILLAMT_TOT>>', debitTotal) ;
							dataln = dataln.replace('<<RCPTAMT_TOT>>', creditTotal) ;
							dataln = dataln.replace('<<BALAMT_TOT>>', balAmount) ;
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(dataln));
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(blankLine));
						}

					}

					pdfdd.content[0].table.body[2][0].table.body.splice(3,1);
					pdfdd.content[0].table.body[2][0].table.body.splice(2,1);
					pdfdd.content[0].table.body[2][0].table.body.splice(1,1);
					pdfdd.content[0].table.body[2][0].table.body.splice(0,1);
						
					pdfMake.createPdf(pdfdd).open({}, win);

				});
			}
		});
	} else {
		alert("No group selected for printing !!") ;
		$scope.rtnMessage = "No groups selected !!" ;
		$scope.isRtnMsgErr = "Yes" ;		
	}
}

}]); //End of controller : BillRegCntrl




