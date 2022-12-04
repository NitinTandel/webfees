

FeesApp.controller('rcptregCntrl', ['$scope', '$http', '$rootScope', '$location',  function($scope, $http, $rootScope , $location ) {
	$scope.pagetitle = "Receipt register" 
	$scope.sortColumn = 'CO_CODE';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;

	var refresh = function() {
	  $http.get('../groups/listall').then(function(response) { 
	    $scope.grouplist = response.data;
	  });

	  $http.get('../billreg/CurrentYearData').then(function(response) {
		$scope.dtFromDate = new Date(response.data.FROM_DT) ;
		$scope.dtToDate = new Date(response.data.TO_DT) ;
	  });

	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();



$scope.PrintCancel = function PrintCancel() {
	var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
	console.log(approotpath);
	window.open(approotpath,"_self");
}

$scope.PrintRcptReport = function PrintRcptReport() {
	var processreport = true ;
	var selectioncount = 0 ;
	var dataOptions = JSON.parse('{"datascope" : 1, "grouplist" : "NA", "partylist" : "NA"}' ) ;

	if ($scope.ReportOption == 2) {
		var selgroupstring = "(" ;
		for(var i=0; i < $scope.grouplist.length ; i++){
		    if($scope.grouplist[i].CHECKED ){
		    	selgroupstring = selgroupstring + "'" + $scope.grouplist[i].GRP_CODE + "'," ;
		    	selectioncount = selectioncount + 1 ;
		  	}
		  }
		if (selectioncount > 0) {
			selgroupstring = selgroupstring.substr(0, selgroupstring.length - 1) + ")";
		}  else {
			selgroupstring = "( 'NA' )";
		}
		dataOptions.datascope = 2  ; 
		dataOptions.grouplist = selgroupstring ;
	} 

	if($scope.ReportOption == 2 && selectioncount == 0 ) {
		processreport = false ;
	}

	if (processreport) {
		var win = window.open('', '_blank');
		var pdfdd = {} ;

		$http.get('../bills/CurrentCoData').then(function(response) {
			if (!response.data.CO_CODE) {
			  	$scope.isIncorrectGroup = true;
			 } else {
				dataOptions.CO_CODE = response.data.CO_CODE ;
				dataOptions.CO_NAME = response.data.COMPANY ;
				dataOptions.FROM_DT = dateinYYYYMMDD($scope.dtFromDate) ;
				dataOptions.TO_DT = dateinYYYYMMDD($scope.dtToDate) ;
				dataOptions.RcptOption = $scope.RcptOption ;

				$http.post('/rcptreg/rcptregdata', dataOptions ).then(function(response) {
				  	if (!response.data) {
				  		//$scope.isIncorrectGroup = true;
				  		//show error
				  	} else {
				  		var rcptdata = response.data ;
						var mydoc = JSON.stringify(ddrcptReg) ;
						var todaysDt = appToday() ;

						mydoc = mydoc.replace(/<<CO_NAME>>/g, dataOptions.CO_NAME);
						mydoc = mydoc.replace(/<<FROM_DT>>/g, strDateDDMMYYYY(dataOptions.FROM_DT));
						mydoc = mydoc.replace(/<<TO_DT>>/g, strDateDDMMYYYY(dataOptions.TO_DT));
						mydoc = mydoc.replace(/<<PRINT_DT>>/g, todaysDt);
						pdfdd = JSON.parse(mydoc);

						var strdataline = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[0]);			
						var strTotline = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[1]);

						var billTot = 0 ;
						var cashTot = 0 ;
						var chqTot = 0 ;
						var rcptTot = 0 ;

				    	for(var i=0; i < rcptdata.length ; i++){
				    		var strline = " " ;
					    	strline =  strdataline.replace('<<PARTY_NAME>>', rcptdata[i].AC_NAME) ;
					    	strline =  strline.replace('<<BILL>>', rcptdata[i].BILL_NO) ;
					    	strline =  strline.replace('<<BILL_AMT>>', numberWithCommas(rcptdata[i].TOT_AMT)) ;
					    	strline =  strline.replace('<<RCPT_DT>>', strDateDDMMYYYY(rcptdata[i].RCPT_DATE)) ;
					    	strline =  strline.replace('<<CASH_AMT>>', numberWithCommas(rcptdata[i].CASH1)) ;
					    	strline =  strline.replace('<<CHQ_AMT>>', numberWithCommas(rcptdata[i].CHEQUE1)) ;
					    	strline =  strline.replace('<<RCPT_AMT>>', numberWithCommas(rcptdata[i].RCPT_AMOUNT)) ;

							billTot = billTot + rcptdata[i].TOT_AMT ;
							cashTot = cashTot + rcptdata[i].CASH1 ;
							chqTot = chqTot + rcptdata[i].CHEQUE1 ;
							rcptTot = rcptTot + rcptdata[i].RCPT_AMOUNT ;

					    	var newbilline = JSON.parse(strline);
					    	pdfdd.content[0].table.body[3][0].table.body.push(newbilline);
				    	}

				    	//Add totoal line for last group	
					    var strline =  strTotline.replace('<<BILL_TOT>>', numberWithCommas(billTot)) ;
					    var strline =  strline.replace('<<CASH_TOT>>', numberWithCommas(cashTot)) ;
					    var strline =  strline.replace('<<CHQ_TOT>>', numberWithCommas(chqTot)) ;
					    var strline =  strline.replace('<<RCPT_TOT>>', numberWithCommas(rcptTot)) ;

						var newbilline = JSON.parse(strline);
						pdfdd.content[0].table.body[3][0].table.body.push(newbilline);
						pdfdd.content[0].table.body[3][0].table.body.splice(1,1);
						pdfdd.content[0].table.body[3][0].table.body.splice(0,1);
						pdfMake.createPdf(pdfdd).open({}, win);

					}	
				});
			}	
		});

	} else {
		alert("No group selected for printing !!") ;
		$scope.rtnMessage = "No groups selected !!" ;
		$scope.isRtnMsgErr = "Yes" ;
	}
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

}]); //End of controller : UserListCntrl




