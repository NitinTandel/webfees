

FeesApp.controller('BillRegCntrl', ['$scope', '$http', '$rootScope', '$location',  function($scope, $http, $rootScope , $location ) {
	$scope.pagetitle = "Bill Register" 
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;
	$scope.selectedComp = {} ;

	var refresh = function() {
	  $http.get('/Outstandings/listall').then(function(response) { 
	    $scope.companylist = response.data;
	    $scope.codata = "";
	  });
	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();


$scope.PrintCancel = function PrintCancel() {
	var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
	console.log(approotpath);
	window.open(approotpath,"_self");
}


$scope.BillRegExcel = async function BillRegExcel() {
	var paramdata = {} ; 
	var codata = await $http.get('../bills/CurrentCoData') ;

	paramdata.CO_CODE = codata.data.CO_CODE ;
	paramdata.CO_NAME = codata.data.COMPANY ;

	var yearData = await $http.get('/billreg/CurrentYearData') ;
	paramdata.YEAR = yearData.data.YEAR ;
	paramdata.FROM_DT = yearData.data.FROM_DT ;
	paramdata.TO_DT = yearData.data.TO_DT ;

	var todaysDt = appToday() ;
	var fromDate = "" ;
	fromDate =  paramdata.FROM_DT.substring(8,10) + "/" + paramdata.FROM_DT.substring(5,7) + "/" + paramdata.FROM_DT.substring(0,4);

	var toDate = "" ;
	toDate =  paramdata.TO_DT.substring(8,10) + "/" + paramdata.TO_DT.substring(5,7) + "/" + paramdata.TO_DT.substring(0,4);

	var headerData = await $http.post('/billreg/headernames', paramdata);
	var hdrdata = headerData.data ;

	xlHeader = [ { header: 'Bill No', key: 'BILL_NO', width: 10 },
				 { header: 'Bill Date', key: 'BILL_DT', width: 12 },
				 { header: 'Party Name', key: 'AC_NAME', width: 30 },
				 { header: 'File No', key: 'AC_CODE', width: 10 },
	 			];
	for(var i=0; i < hdrdata.length ; i++){
		var colhdr = { header: hdrdata[i].DESC, key: hdrdata[i].TRCD, width: 10 } ;
		hdrdata[i].Amount = 0 ;
		xlHeader.push(colhdr);
	}
	xlHeader.push({ header: 'Previous Balance', key: 'OST', width: 10 });
	xlHeader.push({ header: 'Total', key: 'TTT', width: 10 });
	xlHeader.push({ header: 'Receipt', key: 'RRR', width: 10 });
	xlHeader.push({ header: 'T.D.S.', key: 'QQQ', width: 10 });
	xlHeader.push({ header: 'Closed', key: 'CCC', width: 10 });
	xlHeader.push({ header: 'Balance', key: 'BBB', width: 10 });


  	//console.log(xlHeader) ;

  	var getBillData = await $http.post('/billreg/billsdata', paramdata);
  	var billdata = getBillData.data ;

	var billTot = 0 ;
	var curBillId =  0;   //billdata[0].BILLID ;
	var OSTgrandTotal = 0 ;
	var GrandTotal = 0 ;
	var billDate = "" ;

	var xlData = [] ;
  	
	for(var i=0; i < billdata.length ; i++){
		if(curBillId != billdata[i].BILLID) {
			var jsonrow = {};

			billDate = "" ;
			billDate =  billdata[i].BILL_DT.substring(8,10) + "/" + billdata[i].BILL_DT.substring(5,7) + "/" + billdata[i].BILL_DT.substring(0,4);
			jsonrow.BILL_NO = billdata[i].BILL_NO ;
			jsonrow.BILL_DT = billDate ;
			jsonrow.AC_NAME = billdata[i].AC_NAME ;
			jsonrow.AC_CODE = billdata[i].AC_CODE ;

			for(var m=0; m < hdrdata.length ; m++){	
				jsonrow[hdrdata[m].TRCD] = 0
				if ( hdrdata[m].TRCD == billdata[i].TRCD ) {
						jsonrow[hdrdata[m].TRCD] = billdata[i].BILLAMT
						hdrdata[m].Amount = hdrdata[m].Amount + billdata[i].BILLAMT ;
				}
			}
			// Outstanding Balance
			if ( billdata[i].TRCD =="OST" ) {
				jsonrow['OST'] = billdata[i].BILLAMT ;
			} else {
				jsonrow['OST'] = 0 ;
			}


			jsonrow['RRR'] = billdata[i].RCPTAMT ;
			jsonrow['QQQ'] = billdata[i].TDS_AMT ;
			jsonrow['CCC'] = billdata[i].CLIND ;

			jsonrow['TTT'] = 0 ;
			jsonrow['BBB'] = 0 ;

			if(xlData.length > 0) {
				xlData[xlData.length-1].TTT = billTot ;
				if(xlData[xlData.length-1].CCC == 'Y') {
					xlData[xlData.length-1].BBB = 0 ;
				} else {
					xlData[xlData.length-1].BBB = billTot - xlData[xlData.length-1].RRR - xlData[xlData.length-1].QQQ ;	
				}				
			}					
			billTot = billdata[i].BILLAMT ;
			curBillId = billdata[i].BILLID ;

			xlData.push(jsonrow) ;

		} else {
			for(var m=0; m < hdrdata.length ; m++){				
				if ( hdrdata[m].TRCD == billdata[i].TRCD ) {
					jsonrow[hdrdata[m].TRCD] = billdata[i].BILLAMT ;
					billTot = billTot + billdata[i].BILLAMT ;
					hdrdata[m].Amount = hdrdata[m].Amount + billdata[i].BILLAMT ;
					break;
				} 
			}
			if ( billdata[i].TRCD =="OST" ) {
				jsonrow['OST'] = billdata[i].BILLAMT ;
				billTot = billTot + billdata[i].BILLAMT ;
			}

		}
	}		

	//Total for Last row
	if(xlData.length > 0) {
		xlData[xlData.length-1].TTT = billTot ;
	}


	//Total Row
	var jsonrow = {};
	jsonrow.BILL_NO = " ";
	jsonrow.BILL_DT = " " ;
	jsonrow.AC_NAME = "Total" ;
	jsonrow.AC_CODE = " " ;

	var GTotal = 0 ;
	for(var m=0; m < hdrdata.length ; m++){			
		jsonrow[hdrdata[m].TRCD] = hdrdata[m].Amount ;
		GTotal = GTotal + hdrdata[m].Amount ;
	}
						
	var ostTotal = 0 ;
	var rcptTotal = 0 ;
	var tdsTotal = 0 ;
	var balTotal = 0 ;
	for(var j=0; j < xlData.length ; j++){
		ostTotal = ostTotal + xlData[j].OST ;
		rcptTotal = rcptTotal + xlData[j].RRR ;
		tdsTotal = tdsTotal + xlData[j].QQQ ;
		balTotal = balTotal + xlData[j].BBB ;			
	}
	jsonrow.OST = ostTotal ;

	GTotal = GTotal + ostTotal ;
	jsonrow.TTT = GTotal ;

	jsonrow.RRR = rcptTotal ;
	jsonrow.QQQ = tdsTotal ;
	jsonrow.BBB = balTotal ;


	xlData.push(jsonrow) ;


//	console.log(xlData) ;
	const wb = new ExcelJS.Workbook()
	wb.creator = 'A V Solutions';	

	const ws = wb.addWorksheet("BillRegister");

	ws.columns = xlHeader

	for(var i=0; i < xlData.length ; i++){				
		ws.addRow(xlData[i]);
	}	

	for(var i=4; i < xlHeader.length ; i++){	
		var colno = i+1 ;
		var col = ws.getColumn(colno) ; 
		col.numFmt = '_ * #,##0_ ;_ * -#,##0_ ;_ * "-"??_ ;_ @_ ';
  	} 


	var rownum = xlData.length + 1;

	var hdrrow = ws.getRow(1);	
	var totalrow = ws.getRow(rownum);	

	hdrrow.alignment= {
		wrapText: '1' ,
		vertical: 'middle', 
		horizontal: 'center'
	} ;

	hdrrow.fill = {
	  type: 'pattern',
	  pattern:'solid',
	  fgColor:{argb:'FFD3D3D3'},
	  bgColor:{argb:'FFD3D3D3'}
	};

	hdrrow.border = {
		top: {style:'thin'},
		bottom: {style:'thick'},
	};

	hdrrow.style = {font:{bold: true, name: 'Comic Sans MS'}};

	totalrow.border = {
		top: {style:'thin'},
		bottom: {style:'double'},
	};

	totalrow.font = { bold: true };
	totalrow.style = {font:{bold: true, name: 'Comic Sans MS'}};

    const buf = await wb.xlsx.writeBuffer()

	saveAs(new Blob([buf]), 'BillRegister.xlsx')	
   
}


$scope.FullBillRegExcel = async function FullBillRegExcel() {
	var paramdata = {} ; 
	var codata = await $http.get('../bills/CurrentCoData') ;

	paramdata.CO_CODE = codata.data.CO_CODE ;
	paramdata.CO_NAME = codata.data.COMPANY ;

	var yearData = await $http.get('/billreg/CurrentYearData') ;
	paramdata.YEAR = yearData.data.YEAR ;
	paramdata.FROM_DT = yearData.data.FROM_DT ;
	paramdata.TO_DT = yearData.data.TO_DT ;

	var todaysDt = appToday() ;
	var fromDate = "" ;
	fromDate =  paramdata.FROM_DT.substring(8,10) + "/" + paramdata.FROM_DT.substring(5,7) + "/" + paramdata.FROM_DT.substring(0,4);

	var toDate = "" ;
	toDate =  paramdata.TO_DT.substring(8,10) + "/" + paramdata.TO_DT.substring(5,7) + "/" + paramdata.TO_DT.substring(0,4);

	var headerData = await $http.post('/billreg/headersubcds', paramdata);
	var hdrdata = headerData.data ;

	xlHeader = [ { header: 'Bill No', key: 'BILL_NO', width: 10 },
				 { header: 'Bill Date', key: 'BILL_DT', width: 12 },
				 { header: 'Party Name', key: 'AC_NAME', width: 30 },
				 { header: 'File No', key: 'AC_CODE', width: 10 },
	 			];
	for(var i=0; i < hdrdata.length ; i++){
		var colhdr = { header: hdrdata[i].SUBDESC, key: hdrdata[i].TRANCODE, detail:hdrdata[i].DESC,  width: 10 } ;
		hdrdata[i].Amount = 0 ;
		xlHeader.push(colhdr);
	}
	xlHeader.push({ header: 'Previous Balance', key: 'OST', width: 10 });
	xlHeader.push({ header: 'Total', key: 'TTT', width: 10 });
	xlHeader.push({ header: 'Receipt', key: 'RRR', width: 10 });
	xlHeader.push({ header: 'T.D.S.', key: 'QQQ', width: 10 });
	xlHeader.push({ header: 'Closed', key: 'CCC', width: 10 });
	xlHeader.push({ header: 'Balance', key: 'BBB', width: 10 });


  	//console.log(xlHeader) ;
  	var getBillData = await $http.post('/billreg/billsdatasubcd', paramdata);
  	var billdata = getBillData.data ;
	var billTot = 0 ;
	var curBillId =  0;   //billdata[0].BILLID ;
	var OSTgrandTotal = 0 ;
	var GrandTotal = 0 ;
	var billDate = "" ;
	var xlData = [] ;
  	
	for(var i=0; i < billdata.length ; i++){
		if(curBillId != billdata[i].BILLID) {
			var jsonrow = {};

			billDate = "" ;
			billDate =  billdata[i].BILL_DT.substring(8,10) + "/" + billdata[i].BILL_DT.substring(5,7) + "/" + billdata[i].BILL_DT.substring(0,4);
			jsonrow.BILL_NO = billdata[i].BILL_NO ;
			jsonrow.BILL_DT = billDate ;
			jsonrow.AC_NAME = billdata[i].AC_NAME ;
			jsonrow.AC_CODE = billdata[i].AC_CODE ;

			for(var m=0; m < hdrdata.length ; m++){	
				jsonrow[hdrdata[m].TRANCODE] = 0
				if ( hdrdata[m].TRANCODE == billdata[i].TRANCODE ) {
						jsonrow[hdrdata[m].TRANCODE] = billdata[i].BILLAMT
						hdrdata[m].Amount = hdrdata[m].Amount + billdata[i].BILLAMT ;
				}
			}
			// Outstanding Balance
			if ( billdata[i].TRCD =="OST" ) {
				jsonrow['OST'] = billdata[i].BILLAMT ;
			} else {
				jsonrow['OST'] = 0 ;
			}

			jsonrow['RRR'] = billdata[i].RCPTAMT ;
			jsonrow['QQQ'] = billdata[i].TDS_AMT ;
			jsonrow['CCC'] = billdata[i].CLIND ;
			jsonrow['TTT'] = 0 ;
			jsonrow['BBB'] = 0 ;


			if(xlData.length > 0) {
				xlData[xlData.length-1].TTT = billTot ;
				if(xlData[xlData.length-1].CCC == 'Y') {
					xlData[xlData.length-1].BBB = 0 ;
				} else {
					xlData[xlData.length-1].BBB = billTot - xlData[xlData.length-1].RRR - xlData[xlData.length-1].QQQ ;	
				}				
			}					
			billTot = billdata[i].BILLAMT ;
			curBillId = billdata[i].BILLID ;
			xlData.push(jsonrow) ;
		} else {
			for(var m=0; m < hdrdata.length ; m++){				
				if ( hdrdata[m].TRANCODE == billdata[i].TRANCODE ) {
					jsonrow[hdrdata[m].TRANCODE] = billdata[i].BILLAMT ;
					billTot = billTot + billdata[i].BILLAMT ;
					hdrdata[m].Amount = hdrdata[m].Amount + billdata[i].BILLAMT ;
					break;
				} 
			}
			if ( billdata[i].TRCD =="OST" ) {
				jsonrow['OST'] = billdata[i].BILLAMT ;
				billTot = billTot + billdata[i].BILLAMT ;
			}
		}
	}		

	//Total for Last row
	if(xlData.length > 0) {
		xlData[xlData.length-1].TTT = billTot ;
	}

	//Total Row
	var jsonrow = {};
	jsonrow.BILL_NO = " ";
	jsonrow.BILL_DT = " " ;
	jsonrow.AC_NAME = "Total" ;
	jsonrow.AC_CODE = " " ;

	var GTotal = 0 ;
	for(var m=0; m < hdrdata.length ; m++){			
		jsonrow[hdrdata[m].TRANCODE] = hdrdata[m].Amount ;
		GTotal = GTotal + hdrdata[m].Amount ;

	}
						
	var ostTotal = 0 ;
	var rcptTotal = 0 ;
	var tdsTotal = 0 ;
	var balTotal = 0 ;
	

	for(var j=0; j < xlData.length ; j++){
		ostTotal = ostTotal + xlData[j].OST ;
		rcptTotal = rcptTotal + xlData[j].RRR ;
		tdsTotal = tdsTotal + xlData[j].QQQ ;
		balTotal = balTotal + xlData[j].BBB ;			
	}
	jsonrow.OST = ostTotal ;

	GTotal = GTotal + ostTotal ;
	jsonrow.TTT = GTotal ;
	jsonrow.RRR = rcptTotal ;
	jsonrow.QQQ = tdsTotal ;
	jsonrow.BBB = balTotal ;


	xlData.push(jsonrow) ;


//	console.log(xlData) ;
	const wb = new ExcelJS.Workbook()
	wb.creator = 'A V Solutions';	

	const ws = wb.addWorksheet("BillRegisterFull");


	var rownum = 4
	for(var i=0; i < xlHeader.length ; i++){
		var colno = i+1 ;
		var row = ws.getRow(rownum);
		var col = ws.getColumn(colno);
		col.width = xlHeader[i].width ;

		row.alignment= {
			wrapText: '1' ,
			vertical: 'middle', 
			horizontal: 'center'
		} ;


		var currentCell = row.getCell(colno) ;
		currentCell.value = xlHeader[i].header;

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

	rownum++ ;

	for(var i=0; i < xlHeader.length ; i++){
		var colno = i+1 ;		
		var row2 = ws.getRow(rownum);
		var currentCell = row2.getCell(colno) ;

		if(i >3 ) {
			ws.getColumn(colno).numFmt = '_ * #,##0_ ;_ * -#,##0_ ;_ * "-"??_ ;_ @_ ';
		}

		var cellval = ""
		if(i>3 && i< xlHeader.length-4) {
			cellval = xlHeader[i].key;

		}
		currentCell.value = cellval;
		
		currentCell.alignment= {
			vertical: 'middle', 
			horizontal: 'center'
		} ;

		currentCell.fill = {
		  type: 'pattern',
		  pattern:'solid',
		  fgColor:{argb:'FFD3D3D3'},
		  bgColor:{argb:'FFD3D3D3'}
		};

		currentCell.border = {
			bottom: {style:'thick'}
		};
	}	

	rownum++ ;

	for(var j=0; j < xlData.length ; j++){

		for(var i=0; i < xlHeader.length ; i++){
			var colno = i+1 ;		
			var row2 = ws.getRow(rownum);
			var currentCell = row2.getCell(colno) ;

			currentCell.value = xlData[j][xlHeader[i].key] ;

			if(j == xlData.length -1) {
				currentCell.border = {
					top: {style:'thin'},
					bottom: {style:'double'},
				};
				currentCell.font = { bold: true };
			}
		}	
		rownum++ ;		
	}	

    const buf = await wb.xlsx.writeBuffer()
	saveAs(new Blob([buf]), 'BillRegisterFull.xlsx')	   
}



/*
$scope.ExcelBillReg = async function ExcelBillReg() {
	var paramdata = {} ; 
	var createXLSLFormatObj = [];
	$http.get('../bills/CurrentCoData').then(function(response) {
	  	if (!response.data.CO_CODE) {
	  		$scope.isIncorrectGroup = true;
	  	} else {	
			paramdata.CO_CODE = response.data.CO_CODE ;
			paramdata.CO_NAME = response.data.COMPANY ;
			$http.get('/billreg/CurrentYearData').then(function(response) {
				paramdata.YEAR = response.data.YEAR ;
				paramdata.FROM_DT = response.data.FROM_DT ;
				paramdata.TO_DT = response.data.TO_DT ;

				var todaysDt = appToday() ;

				var fromDate = "" ;
	    		fromDate =  paramdata.FROM_DT.substring(8,10) + "/" + paramdata.FROM_DT.substring(5,7) + "/" + paramdata.FROM_DT.substring(0,4);

				var toDate = "" ;
	    		toDate =  paramdata.TO_DT.substring(8,10) + "/" + paramdata.TO_DT.substring(5,7) + "/" + paramdata.TO_DT.substring(0,4);

				$http.post('/billreg/headernames', paramdata).then(function(resp) {
					var hdrdata = resp.data ;
		        	var xlsHeader1 = ["Bill", "Bill", "Party Name", "File No"];
		        	var xlsHeader2 = ["No", "Date", " ", " "];
		        	
					//Fill header 1
					for(var i=0; i < hdrdata.length ; i++){
						xlsHeader1.push(hdrdata[i].DESC);
						xlsHeader2.push(hdrdata[i].TRCD);
						//Make place to store the Total Amount
		    			hdrdata[i].Amount = 0 ;						
					}


					xlsHeader1.push("Previous Balance");
					xlsHeader2.push("OST");

					xlsHeader1.push("Total");
					xlsHeader2.push(" ");

    				createXLSLFormatObj.push(xlsHeader1);
    				createXLSLFormatObj.push(xlsHeader2);


					$http.post('/billreg/billsdata', paramdata).then(function(response) {
						var billdata = response.data ;
						var billTot = 0 ;
						var curBillId =  0;   //billdata[0].BILLID ;
						var OSTgrandTotal = 0 ;
						var GrandTotal = 0 ;
						var billDate = "" ;

						for(var i=0; i < billdata.length ; i++){
							if(curBillId != billdata[i].BILLID) {
		        				var xlsRowData = [" ", " ", " ", " "];
								billDate = "" ;
	    						billDate =  billdata[i].BILL_DT.substring(8,10) + "/" + billdata[i].BILL_DT.substring(5,7) + "/" + billdata[i].BILL_DT.substring(0,4);

		        				xlsRowData[0] = billdata[i].BILL_NO
		        				xlsRowData[1] = billDate
		        				xlsRowData[2] = billdata[i].AC_NAME
		        				xlsRowData[3] = billdata[i].AC_CODE
								for(var m=0; m < hdrdata.length ; m++){									
									if ( hdrdata[m].TRCD == billdata[i].TRCD ) {
										xlsRowData.push(billdata[i].BILLAMT) ;
										hdrdata[m].Amount = hdrdata[m].Amount + billdata[i].BILLAMT ;
									} else {
										xlsRowData.push(0);	
									}
								}
								// Outstanding Balance
								if ( billdata[i].TRCD =="OST" ) {
									xlsRowData.push(billdata[i].BILLAMT) ;
								} else {
									xlsRowData.push(0);	
								}

								xlsRowData.push(0);

								if(createXLSLFormatObj.length > 0) {
									createXLSLFormatObj[createXLSLFormatObj.length-1][xlsRowData.length-1] = billTot ;
								}
								
								billTot = billdata[i].BILLAMT ;
								curBillId = billdata[i].BILLID ;	
				  				createXLSLFormatObj.push(xlsRowData);
							} else {
								for(var m=0; m < xlsHeader2.length ; m++){
									if ( xlsHeader2[m] == billdata[i].TRCD ) {
										xlsRowData[m] = billdata[i].BILLAMT  ;	
										billTot = billTot + billdata[i].BILLAMT ;
										break;
									} 
								}
								for(var m=0; m < hdrdata.length ; m++){																
									if ( hdrdata[m].TRCD == billdata[i].TRCD ) {
										hdrdata[m].Amount = hdrdata[m].Amount + billdata[i].BILLAMT ;
										break;
									} 
								}
							}
						}	

						if(createXLSLFormatObj.length > 0) {
							createXLSLFormatObj[createXLSLFormatObj.length-1][xlsRowData.length-1] = billTot ;
						}

						//Total Row
		        		var xlsRowData = [" ", " ", "Total", " "];
		        		var GTotal = 0 ;
						for(var m=0; m < hdrdata.length ; m++){									
							xlsRowData.push(hdrdata[m].Amount) ;
							GTotal = GTotal + hdrdata[m].Amount ;
						}
						
						var ostTotal = 0 ;
						for(var j=2; j < createXLSLFormatObj.length ; j++){
							ostTotal = ostTotal + createXLSLFormatObj[j][xlsRowData.length] ;
						}

						xlsRowData.push(ostTotal);
						GTotal = GTotal + ostTotal ;

						xlsRowData.push(GTotal);

						createXLSLFormatObj.push(xlsRowData);


						var wscols = [
						    {wch:10},
						    {wch:12},
						    {wch:30},
						    {wch:10}
						];


				    	var wb = XLSX.utils.book_new();
				        wb.Props = {
				                Title: "Bill Register",
				                Subject: "Bill Register",
				                Author: "A V Solutions",
				                CreatedDate: new Date(2017,12,19)
				        };

				        wb.SheetNames.push("BillRegister");

		        		var ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);
						ws['!cols'] = wscols;


				        wb.Sheets["BillRegister"] = ws;
				        var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
				        function s2ab(s) {		  
				                var buf = new ArrayBuffer(s.length);
				                var view = new Uint8Array(buf);
				                for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
				                return buf;
				        }
				        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'BillRegister.xlsx');
					});
				});
			});
		}
	});

}



$scope.TestExcelJS = async function TestExcelJS() {
    const wb = new ExcelJS.Workbook()
    var options = {
                     filename: './Excel.xlsx',
                     useStyles: true,
                     useSharedStrings: true
                 };

	wb.creator = 'A V Solutions';	

    const ws = wb.addWorksheet("My Test");


	ws.columns = [
                     { header: 'Id dgsdgdgdgd dsgdsgdg', key: 'id', width: 10 },
                     { header: 'Name', key: 'name', width: 32 },
                     { header: 'D.O.B.', key: 'DOB', width: 10 }
                 ];
    ws.addRow({ id: "'001", name: 'John Doe', dob: new Date(1970, 1, 1) });
    ws.addRow({ id: "'002", name: 'Jane Doe', dob: new Date(1965, 1, 7) });

	ws.getCell('A1').border = {
	  top: {style:'thin'},
	  left: {style:'thin'},
	  bottom: {style:'thin'},
	  right: {style:'thin'}
	};

	ws.getCell('A1').alignment= {
    	wrapText: '1' 
  	} ;

   var scell = "B" + 2

	ws.getCell(scell).border = {
	  top: {style:'thin'},
	  left: {style:'thin'},
	  bottom: {style:'thin'},
	  right: {style:'thin'}
	};


ws.getCell('A2').fill = {
  type: 'pattern',
  pattern:'darkTrellis',
  fgColor:{argb:'FFFFFF00'},
  bgColor:{argb:'FF0000FF'}
};


ws.getCell('A5').value = { formula: 'A1+A2', result: 7 };

//    const row = ws.addRow(['a', 'b', 'c'])
//    row.font = { bold: true }

    const buf = await wb.xlsx.writeBuffer()

    saveAs(new Blob([buf]), 'abc.xlsx')	

}

*/


$scope.PrintBillReg = function PrintBillReg() {
	var pdfdd = {} ;
	var paramdata = {} ; 
	var mydoc = JSON.stringify(ddbillReg) ;

	pdfdd = JSON.parse(mydoc);

	var strHdr1line = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[0]);
	var strHdr2Line = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[1]);
	var strDataLine = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[0]);
//	var strTotalLine = JSON.stringify(pdfdd.content[0].table.body[4][0].table.body[0]);

	var strHdr1col = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[0][4]);
	var strHdr2col = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[1][4]);
	var strDatacol = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[0][4]);
	var strGTotCol = JSON.stringify(pdfdd.content[0].table.body[4][0].table.body[0][4]);


	//remove all the Amount columns from header 1
	pdfdd.content[0].table.body[2][0].table.body[0].splice(4,10);

	//remove all the Amount columns from header 2
	pdfdd.content[0].table.body[2][0].table.body[1].splice(4,10);

	//remove all the Amount columns from Data line 1
	pdfdd.content[0].table.body[3][0].table.body[0].splice(4,10);

	//remove all the Amount columns from Data line 2
	pdfdd.content[0].table.body[3][0].table.body[1].splice(4,10);

	//remove all the Amount columns from Grand Total line 
	pdfdd.content[0].table.body[4][0].table.body[0].splice(4,10);


	mydoc = JSON.stringify(pdfdd) ;

	$http.get('../bills/CurrentCoData').then(function(response) {
	  	if (!response.data.CO_CODE) {
	  		$scope.isIncorrectGroup = true;
	  	} else {	
			paramdata.CO_CODE = response.data.CO_CODE ;
			paramdata.CO_NAME = response.data.COMPANY ;
			$http.get('/billreg/CurrentYearData').then(function(response) {
				paramdata.YEAR = response.data.YEAR ;
				paramdata.FROM_DT = response.data.FROM_DT ;
				paramdata.TO_DT = response.data.TO_DT ;

				var todaysDt = appToday() ;

				var fromDate = "" ;
	    		fromDate =  paramdata.FROM_DT.substring(8,10) + "/" + paramdata.FROM_DT.substring(5,7) + "/" + paramdata.FROM_DT.substring(0,4);

				var toDate = "" ;
	    		toDate =  paramdata.TO_DT.substring(8,10) + "/" + paramdata.TO_DT.substring(5,7) + "/" + paramdata.TO_DT.substring(0,4);

				mydoc = mydoc.replace(/<<CO_NAME>>/g, paramdata.CO_NAME);
				mydoc = mydoc.replace(/<<FROM_DT>>/g, fromDate);
				mydoc = mydoc.replace(/<<TO_DT>>/g, toDate);
				mydoc = mydoc.replace(/<<PRINT_DT>>/g, todaysDt);

				pdfdd = JSON.parse(mydoc);

				$http.post('/billreg/headernames', paramdata).then(function(resp) {
					var hdrdata = resp.data ;

					//Fill header 1
					for(var i=0; i < hdrdata.length ; i++){
						var jHdr =  JSON.parse(strHdr1col);
						jHdr.text = hdrdata[i].DESC ;
		    			pdfdd.content[0].table.body[2][0].table.body[0].push(jHdr);
					}
					var jHdr =  JSON.parse(strHdr1col);
					jHdr.text = "Previous Balance" ;
		    		pdfdd.content[0].table.body[2][0].table.body[0].push(jHdr);

					var jHdr =  JSON.parse(strHdr1col);
					jHdr.text = "Total" ;
		    		pdfdd.content[0].table.body[2][0].table.body[0].push(jHdr);

		    		//Header 2
					for(var i=0; i < hdrdata.length ; i++){
						var jHdr =  JSON.parse(strHdr2col);
						jHdr.text = hdrdata[i].TRCD ;
		    			pdfdd.content[0].table.body[2][0].table.body[1].push(jHdr);
					}
					var jHdr =  JSON.parse(strHdr2col);
					jHdr.text = " " ;
		    		pdfdd.content[0].table.body[2][0].table.body[1].push(jHdr);

					var jHdr =  JSON.parse(strHdr2col);
					jHdr.text = " " ;
		    		pdfdd.content[0].table.body[2][0].table.body[1].push(jHdr);

					//Fill Grand Total Line
					for(var i=0; i < hdrdata.length ; i++){
						var jHdr =  JSON.parse(strGTotCol);
						jHdr.text = "<<GT" + hdrdata[i].TRCD  +  ">>";
		    			pdfdd.content[0].table.body[4][0].table.body[0].push(jHdr);
		    			//Make place to store the Total Amount
		    			hdrdata[i].Amount = 0 ;
					}
					var jHdr =  JSON.parse(strGTotCol);
					jHdr.text = "<<GTOST>>" ;
		    		pdfdd.content[0].table.body[4][0].table.body[0].push(jHdr);

					var jHdr =  JSON.parse(strGTotCol);
					jHdr.text = "<<GTTOT>>" ;
		    		pdfdd.content[0].table.body[4][0].table.body[0].push(jHdr);

		    		//Data line 1
					for(var i=0; i < hdrdata.length ; i++){
						var jHdr =  JSON.parse(strDatacol);
						jHdr.text = "<<" + hdrdata[i].TRCD  +  ">>";
		    			pdfdd.content[0].table.body[3][0].table.body[0].push(jHdr);
					}
					var jHdr =  JSON.parse(strDatacol);
					jHdr.text = "<<OST>>" ;
		    		pdfdd.content[0].table.body[3][0].table.body[0].push(jHdr);

					var jHdr =  JSON.parse(strDatacol);
					jHdr.text = "<<TOTAL>>" ;
		    		pdfdd.content[0].table.body[3][0].table.body[0].push(jHdr);

		    		//Data line 2
					for(var i=0; i < hdrdata.length ; i++){
		    			pdfdd.content[0].table.body[3][0].table.body[1].push({});
					}
		    		pdfdd.content[0].table.body[3][0].table.body[1].push({});
		    		pdfdd.content[0].table.body[3][0].table.body[1].push({});
		    		pdfdd.content[0].table.body[3][0].table.body[1][1].colSpan = (hdrdata.length + 2 + 3);
		    		
		    		var billLine1 = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[0]);
		    		var billLine2 = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[1]);
					
					$http.post('/billreg/billsdata', paramdata).then(function(response) {												
						if(response.data.length > 0) {
							var billdata = response.data ;
							var billTot = 0 ;
							var curBillId = billdata[0].BILLID ;
							var trcdData = "("   ; 
							var dataln1 = billLine1 ;
							var OSTgrandTotal = 0 ;
							var GrandTotal = 0 ;

							for(var i=0; i < billdata.length ; i++){
								//Make the totals
								for(var j=0; j < hdrdata.length ; j++){
									if ( hdrdata[j].TRCD  == billdata[i].TRCD ) {
										hdrdata[j].Amount = hdrdata[j].Amount + billdata[i].BILLAMT ;
										break ;
									}   
								}

								if (billdata[i].TRCD == "OST" ) {
									OSTgrandTotal = OSTgrandTotal + billdata[i].BILLAMT  ;
								}
								GrandTotal = GrandTotal + billdata[i].BILLAMT ;

								if(curBillId != billdata[i].BILLID) {
									var billDate = "" ;
									billDate =  billdata[i-1].BILL_DT.substring(8,10) + "/" + billdata[i-1].BILL_DT.substring(5,7) + "/" + billdata[i-1].BILL_DT.substring(0,4);

									//update data for previous row
									dataln1 = dataln1.replace( '<<BILLNO>>' , billdata[i-1].BILL_NO);
									dataln1 = dataln1.replace( '<<BILL_DT>>' , billDate);
									dataln1 = dataln1.replace( '<<PARTY_NAME>>' , billdata[i-1].AC_NAME);
									dataln1 = dataln1.replace( '<<AC_CODE>>' , billdata[i-1].AC_CODE);
									dataln1 = dataln1.replace( '<<TOTAL>>' , numberWithCommas(billTot));

									//Now remove all unused TRCDs
									for(var k=0; k < hdrdata.length ; k++){
										var srchtrcd =  "<<" + hdrdata[k].TRCD + ">>"
										dataln1 = dataln1.replace( srchtrcd , "-");
									}
									dataln1 = dataln1.replace( "<<OST>>" , "-");

									pdfdd.content[0].table.body[3][0].table.body.push(JSON.parse(dataln1));

									trcdData = trcdData + ")";
									var dataln2 = billLine2.replace(/<<TRCD_DATA>>/g, trcdData);								
									pdfdd.content[0].table.body[3][0].table.body.push(JSON.parse(dataln2));

									//Srart new data for current line
									curBillId = billdata[i].BILLID ;
									trcdData = "(" + billdata[i].TRANLIST ;
									billTot = billdata[i].BILLAMT ;
									dataln1 = billLine1 ;
									var srchtrcd =  "<<" + billdata[i].TRCD + ">>"
									dataln1 = dataln1.replace( srchtrcd , numberWithCommas(billdata[i].BILLAMT));
								} else {
									//if (i != 0 ) {
										trcdData = trcdData + " , " + billdata[i].TRANLIST ;
										var srchtrcd =  "<<" + billdata[i].TRCD + ">>"
										dataln1 = dataln1.replace( srchtrcd , numberWithCommas(billdata[i].BILLAMT));
										billTot = billTot + billdata[i].BILLAMT ;
									//}
								}							
							}
							//remove first two lines which 
							pdfdd.content[0].table.body[3][0].table.body.splice(0,2);

							//Update the totals
							mydoc = JSON.stringify(pdfdd) ;
							for(var j=0; j < hdrdata.length ; j++){
								var srchtrcd =  "<<GT" + hdrdata[j].TRCD + ">>" ;
								mydoc = mydoc.replace(srchtrcd, numberWithCommas(hdrdata[j].Amount));
							}
							mydoc = mydoc.replace("<<GTOST>>", numberWithCommas(OSTgrandTotal));
							mydoc = mydoc.replace("<<GTTOT>>", numberWithCommas(GrandTotal));

							var win = window.open('', '_blank');
							pdfdd = JSON.parse(mydoc);
							pdfMake.createPdf(pdfdd).open({}, win);						
						} else {
							ShowSnackbar("No Bills found for printing Bill register" , 0) ;
						}
					});				
				});
			});
		}			
	});
}

}]); //End of controller : BillRegCntrl




