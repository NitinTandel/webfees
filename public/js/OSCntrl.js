

FeesApp.controller('osCntrl', ['$scope', '$http', '$rootScope', '$location',  function($scope, $http, $rootScope , $location ) {
	$scope.pagetitle = "Outstandings" 
	$scope.sortColumn = 'CO_CODE';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.CompanyOption = "1"
	$scope.ReportOption ="1"
	$scope.onlyTillCurrentYear = true

	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;

	$scope.confirmPassword = "" ;
	$scope.selectedComp = {} ;

	$scope.pageDataLoaded  = false ;

	var refresh = function() {
	  $http.get('/Outstandings/listall').then(function(response) { 
	    $scope.companylist = response.data;
	    $scope.codata = "";
	  	$scope.pageDataLoaded  = true ;
	  });

	  $http.get('../groups/listall').then(function(response) { 
	    $scope.grouplist = response.data;
	  });

	  $http.get('/years/CurrentYearData').then(function(response) {
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


$scope.OSRegExcel = async function OSRegExcel() {
	var processreport = true ;
	var selectioncount = 0 ;
	var dataOptions = JSON.parse('{"datascope" : 1, "grouplist" : "NA", "partylist" : "NA" , "tillCurrentYr" : true }' ) ;

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
	dataOptions.companyscope = $scope.CompanyOption 
	dataOptions.tillCurrentYr =  $scope.onlyTillCurrentYear

	if($scope.ReportOption == 2 && selectioncount == 0 ) {
		processreport = false ;
	}

	if (processreport) {
		const response = await $http.post('/outstandings/allOS', dataOptions ) ;
		if (!response.data) {
			//$scope.isIncorrectGroup = true;
			//show error
		} else {
			const osdata = response.data ;
			
//			for(let i=0; i < osdata.length ; i++){
//				osdata[i].FULL_PARTY_NM = `[${osdata[i].AC_CODE}] ${osdata[i].AC_NAME}`
//  		    }

			const todaysDt = appToday() ;
			var asONdate = $scope.onlyTillCurrentYear ? dateinDDMMYYYY($scope.dtToDate) : todaysDt

	  		const wb = new ExcelJS.Workbook()
			wb.created  = new Date();
			wb.creator = 'A V Solutions' 

			//var options = {
			//	dateFormats: ['DD/MM/YYYY']
			//};
		
		  
			const ws = wb.addWorksheet("OSRegister");

			ws.getColumn(5).alignment = { vertical: 'middle', horizontal: 'right' };
			ws.getColumn(5).width = 8

			ws.getColumn(6).alignment = { vertical: 'middle', horizontal: 'center' };
			ws.getColumn(6).width = 12


			ws.getColumn(7).numFmt = '#,##0 ;[Red]\-#,##0 ';
			ws.getColumn(8).numFmt = "#,##0 ;[Red]\-#,##0 "
			ws.getColumn(9).numFmt = "#,##0 ;[Red]\-#,##0 "
			
			ws.getColumn(7).width = 12
			ws.getColumn(8).width = 12
			ws.getColumn(9).width = 12

			ws.addRow(["H. B. Gala & Co. & Associated Firms"," "]);
			ws.mergeCells('A1:J1');
			ws.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

			ws.getCell('A1').font = {
				name: 'Arial',
				family: 4,
				size: 16,
				underline: true,
				bold: true
			};
			
			ws.addRow(["Outstanding Register"," "]);
			ws.mergeCells('A2:J2');
			ws.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };
			ws.getCell('A2').font = {
				name: 'Arial',
				family: 4,
				size: 14,
			};

			ws.addRow([" "," "]);

			ws.addRow(["As on " + asONdate , "" ]);
			ws.mergeCells('A4:J4');
			ws.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' };

			ws.addRow([" "," "]);

			ws.addRow(["Print Date : " + todaysDt," "]);
			ws.mergeCells('A6:J6');

			
			ws.addRow(["Group No", "File No", "Party Name","Co. Name", "Bill" ,"", "", "Rcpt", "TDS", "Bal" ]);
			ws.mergeCells('E7:G7');
			ws.addRow([" "," "," "," ", "No" ,"Date", "Amt", "Amt", "Amt", "Amt" ]);

			ws.getCell('E7').alignment = { vertical: 'middle', horizontal: 'center' };
			ws.getCell('H7').alignment = { vertical: 'middle', horizontal: 'center' };
			ws.getCell('I7').alignment = { vertical: 'middle', horizontal: 'center' };
			ws.getCell('J7').alignment = { vertical: 'middle', horizontal: 'center' };

			ws.getCell('E8').alignment = { vertical: 'middle', horizontal: 'center' };
			ws.getCell('F8').alignment = { vertical: 'middle', horizontal: 'center' };
			ws.getCell('G8').alignment = { vertical: 'middle', horizontal: 'center' };
			ws.getCell('H8').alignment = { vertical: 'middle', horizontal: 'center' };
			ws.getCell('I8').alignment = { vertical: 'middle', horizontal: 'center' };
			ws.getCell('J8').alignment = { vertical: 'middle', horizontal: 'center' };

			ws.getColumn(3).width = 30
			ws.getColumn(4).width = 25

			for(var i=1; i < 11 ; i++){
				var row = ws.getRow(7);		
				var currentCell = row.getCell(i) ;
		
				currentCell.fill = {
				  type: 'pattern',
				  pattern:'solid',
				  fgColor:{argb:'FFD3D3D3'},
				  bgColor:{argb:'FFD3D3D3'}
				};
		
				currentCell.border = {
					top: {style:'thin'}
				};		
			}	
		
			for(var i=1; i < 11 ; i++){
				var row = ws.getRow(8);		
				var currentCell = row.getCell(i) ;
		
				currentCell.fill = {
				  type: 'pattern',
				  pattern:'solid',
				  fgColor:{argb:'FFD3D3D3'},
				  bgColor:{argb:'FFD3D3D3'}
				};
		
				currentCell.border = {
					bottom: {style:'thin'}
				};
			}	

			let billTotal = 0
			let rcptTotal = 0
			let tdsTotal = 0
			let balanceTotal = 0
			let totalRowNumber = 8
			//let billDate = ""
			for(var i=0; i < osdata.length ; i++){
				billTotal = billTotal + osdata[i].TOT_AMT
				rcptTotal = rcptTotal + osdata[i].RCPT_AMT
				tdsTotal = tdsTotal + osdata[i].TDS_AMT
				balanceTotal = balanceTotal + osdata[i].BAL_AMT 
				totalRowNumber++

				//billDate = strDateDDMMYYYY(osdata[i].BILL_DT) ;
				var myear = parseInt(osdata[i].BILL_DT.substr(0,4))
				var mmonth = parseInt(osdata[i].BILL_DT.substr(5,2)) -1
				var mday = parseInt(osdata[i].BILL_DT.substr(8,2))

				ws.addRow([ osdata[i].GRP_CODE, osdata[i].AC_CODE,  osdata[i].AC_NAME, osdata[i].COMPANY , osdata[i].BILL_NO, new Date(myear, mmonth, mday, 10, 10) , osdata[i].TOT_AMT, osdata[i].RCPT_AMT, osdata[i].TDS_AMT, osdata[i].BAL_AMT ]);

			}
			ws.addRow([ "", "",  " ", "Total" , "", "", billTotal, rcptTotal, tdsTotal, balanceTotal ]);
			totalRowNumber++
  
			for(var i=1; i < 11 ; i++){
				var row = ws.getRow(totalRowNumber);		
				var currentCell = row.getCell(i) ;
		
				currentCell.border = {
					top: {style:'thin'},
					bottom: {style:'thick'}
				};		
			}	

			ws.views = [
				{state: 'frozen', xSplit: 0, ySplit: 8, topLeftCell: 'A9', activeCell: 'A9'}
			];			

			const buf = await wb.xlsx.writeBuffer()
			saveAs(new Blob([buf]), 'OSRegister.xlsx')						  
	  }
	} else {
		alert("No group selected for printing !!") ;
		$scope.rtnMessage = "No groups selected !!" ;
		$scope.isRtnMsgErr = "Yes" ;
	}

}



$scope.PrintOSReport = function PrintOSReport() {
	var processreport = true ;
	var selectioncount = 0 ;
	var dataOptions = JSON.parse('{"datascope" : 1, "grouplist" : "NA", "partylist" : "NA" , "tillCurrentYr" : true }' ) ;

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
	dataOptions.companyscope = $scope.CompanyOption 
	dataOptions.tillCurrentYr =  $scope.onlyTillCurrentYear

	if($scope.ReportOption == 2 && selectioncount == 0 ) {
		processreport = false ;
	}

	if (processreport) {
		var win = window.open('', '_blank');
		var pdfdd = {} ;

		$http.post('/outstandings/allOS', dataOptions ).then(function(response) {
//			console.log(response.data)
		  	if (!response.data) {
		  		//$scope.isIncorrectGroup = true;
		  		//show error
		  	} else {
		  		var osdata = response.data ;
				var mydoc = JSON.stringify(ddOSReg) ;
				var todaysDt = appToday() ;
				var asONdate = $scope.onlyTillCurrentYear ? dateinDDMMYYYY($scope.dtToDate) : todaysDt

				mydoc = mydoc.replace(/<<ASON_DT>>/g, asONdate);
				mydoc = mydoc.replace(/<<PRINT_DT>>/g, todaysDt);

				pdfdd = JSON.parse(mydoc);

				var strGrpline = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[0]);			
				var strbillline = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[1]);
				var strGrpTot = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[2]);

				//console.log(strGrpTot);
				pdfdd = JSON.parse(mydoc);

		    	var billDate =  "";
				var grpid = "" ;
				var grpBillTot = 0 ;
				var grpRcptTot = 0 ;
				var grpBalTot = 0 ;
				var grpTDSTot = 0 ;
		    	for(var i=0; i < osdata.length ; i++){
					if(osdata[i].GRP_CODE != grpid) {
			    		if (i != 0) {
			    			var strline =  strGrpTot.replace('<<GRP_BILL_TOT>>', numberWithCommas(grpBillTot)) ;
			    			var strline =  strline.replace('<<GRP_RCPT_TOT>>', numberWithCommas(grpRcptTot)) ;
							var strline =  strline.replace('<<GRP_TDS_TOT>>', numberWithCommas(grpTDSTot)) ;
			    			var strline =  strline.replace('<<GRP_BAL_TOT>>', numberWithCommas(grpBalTot)) ;
				    		var newbilline = JSON.parse(strline);
				    		pdfdd.content[0].table.body[3][0].table.body.push(newbilline);
			    		}

			    		var strline =  strGrpline.replace('<<GROUP_ID>>', osdata[i].GRP_CODE ) ;
			    		var newbilline = JSON.parse(strline);
			    		pdfdd.content[0].table.body[3][0].table.body.push(newbilline);

						grpBillTot = 0 ;
						grpRcptTot = 0 ;
						grpBalTot = 0 ;
						grpid = osdata[i].GRP_CODE ;
					} 

		   			billDate = strDateDDMMYYYY(osdata[i].BILL_DT) ;
			    	
			    	var strline =  strbillline.replace('<<PARTY_NAME>>', osdata[i].AC_CODE + ' - ' + osdata[i].AC_NAME ) ;
			    	var strline =  strline.replace('<<CO_NAME>>', osdata[i].COMPANY ) ;
			    	var strline =  strline.replace('<<BILL>>', osdata[i].BILL_NO ) ;
			    	var strline =  strline.replace('<<BILL_DT>>', billDate ) ;

			    	var strline =  strline.replace('<<BILL_AMT>>', numberWithCommas(osdata[i].TOT_AMT) ) ;
			    	var strline =  strline.replace('<<RCPT_AMT>>', numberWithCommas(osdata[i].RCPT_AMT) ) ;
					var strline =  strline.replace('<<TDS_AMT>>', numberWithCommas(osdata[i].TDS_AMT) ) ;					
			    	var strline =  strline.replace('<<BAL_AMT>>', numberWithCommas(osdata[i].BAL_AMT) ) ;
					grpBillTot = grpBillTot + osdata[i].TOT_AMT;
					grpRcptTot = grpRcptTot + osdata[i].RCPT_AMT;
					grpTDSTot = grpTDSTot + osdata[i].TDS_AMT;
					grpBalTot = grpBalTot + osdata[i].BAL_AMT;

			    	var newbilline = JSON.parse(strline);
			    	pdfdd.content[0].table.body[3][0].table.body.push(newbilline);
		    	}

		    	//Add total line for last group	
			    var strline =  strGrpTot.replace('<<GRP_BILL_TOT>>', numberWithCommas(grpBillTot)) ;
			    var strline =  strline.replace('<<GRP_RCPT_TOT>>', numberWithCommas(grpRcptTot)) ;
				var strline =  strline.replace('<<GRP_TDS_TOT>>', numberWithCommas(grpTDSTot)) ;
			    var strline =  strline.replace('<<GRP_BAL_TOT>>', numberWithCommas(grpBalTot)) ;
				var newbilline = JSON.parse(strline);
				pdfdd.content[0].table.body[3][0].table.body.push(newbilline);

				pdfdd.content[0].table.body[3][0].table.body.splice(2,1);
				pdfdd.content[0].table.body[3][0].table.body.splice(1,1);
				pdfdd.content[0].table.body[3][0].table.body.splice(0,1);

				pdfMake.createPdf(pdfdd).open({}, win);
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




