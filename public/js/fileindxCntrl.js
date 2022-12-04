// Updated on : 20/8/2022

FeesApp.controller('fileindxCntrl', ['$scope', '$http', '$rootScope', '$location',  function($scope, $http, $rootScope , $location ) {
	$scope.pagetitle = "File Index" 
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;
	$scope.selectedComp = {} ;
	$scope.ReportOption ="1"
	$scope.showInactive = false


$scope.PrintCancel = function PrintCancel() {
	var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
	console.log(approotpath);
	window.open(approotpath,"_self");
}


$scope.PrintfileIndx = function PrintfileIndx() {
	var win = window.open('', '_blank');
	var pdfdd = {} ;

	var paramdata = {} ; 
	var mydoc = JSON.stringify(ddfileIndx) ;

	var todaysDt = appToday() ;

	pdfdd = JSON.parse(mydoc);

	var strtblData = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[0]);

	mydoc = JSON.stringify(pdfdd) ;

	$http.get('../fileindx/CurrentCoData').then(function(response) {
	  	if (!response.data.CO_CODE) {
	  		$scope.isIncorrectGroup = true;
	  	} else {	
			paramdata.CO_CODE = response.data.CO_CODE ;
			paramdata.CO_NAME = response.data.COMPANY ;
			var withInactive = ( $scope.showInactive ? "1" : "0")

			$http.get('/fileindx/filesdata/' + $scope.ReportOption +"-" + withInactive ).then(function(response) {
				var reportOption = ''
				if($scope.ReportOption === '1') {
					reportOption = 'Group wise'
				}

				if($scope.ReportOption === '2') {
					reportOption = 'File Number wise'
				}

				if($scope.ReportOption === '3') {
					reportOption = 'Party Name wise'
				}

				mydoc = mydoc.replace(/<<PRINT_DT>>/g, todaysDt);
				mydoc = mydoc.replace(/<<RPTOPTION>>/g, reportOption);

				pdfdd = JSON.parse(mydoc);

				//Create new Array to update left and right side
				var IndexData = []
				var leftEntry = true
				var pageLineNo = 1
				var currentLine = 1
				var grpId = ''
				var isNewGrp = false
				const LinesPerPage = 19
				const IsGrpWise = ($scope.ReportOption === '1')

				for(let i =0; i< response.data.length; i++ ) {
					isNewGrp = IsGrpWise === false ? false : (grpId !== response.data[i].GRP_CODE )

					if(pageLineNo > LinesPerPage) {
						leftEntry = !leftEntry
						pageLineNo = 1
						currentLine = ( leftEntry === false ? currentLine - LinesPerPage : currentLine)
					}

					if(leftEntry) {
//						if(isNewGrp) {
//							IndexData.push({ LCODE : response.data[i].GRP_CODE , LNAME : response.data[i].GRP_NAME, 
//								LGRP : true, RCODE : '' , RNAME : '' , RGRP : false  })	
//							currentLine++
//							pageLineNo++
//						}
						IndexData.push({ LCODE : response.data[i].AC_CODE , LNAME : response.data[i].AC_NAME, 
							LGRP : false , RCODE : '' , RNAME : '' , RGRP : false  } )
							
					} else {
//						if(isNewGrp) {
//							IndexData[currentLine - 1].RCODE = response.data[i].GRP_CODE
//							IndexData[currentLine - 1].RNAME = response.data[i].GRP_NAME
//							IndexData[currentLine - 1].RGRP = true
//							currentLine++
//							pageLineNo++
//						}

						if(pageLineNo > LinesPerPage) {
							IndexData.push({ LCODE : '' , LNAME : '' , 	LGRP : false , 
							RCODE : response.data[i].AC_CODE , RNAME : response.data[i].AC_NAME , RGRP : false  } )
						} else {
							IndexData[currentLine - 1].RCODE = response.data[i].AC_CODE
							IndexData[currentLine - 1].RNAME = response.data[i].AC_NAME
							IndexData[currentLine - 1].RGRP = false
						}
					}
					grpId = response.data[i].GRP_CODE
					currentLine++
					pageLineNo++
				}

				var strline = ''
				var newline = null
				for(let k=0; k< IndexData.length; k++ ) {
					strline =  strtblData.replace('<<AC_CODE1>>', IndexData[k].LCODE) ;
					strline =  strline.replace('<<AC_NAME1>>', IndexData[k].LNAME) ;
					strline =  strline.replace('<<AC_CODE2>>', IndexData[k].RCODE) ;
					strline =  strline.replace('<<AC_NAME2>>', IndexData[k].RNAME) ;
					strline =  strline.replace(/LGRP/g, IndexData[k].LGRP) ;
					newline = JSON.parse(strline);
					if(IndexData[k].LGRP){
						newline[0].border[3] = true
						newline[1].border[3] = true
					}
					if(IndexData[k].RGRP){
						newline[3].border[3] = true
						newline[4].border[3] = true
					}
					pdfdd.content[0].table.body[3][0].table.body.push(newline);
				}
				pdfdd.content[0].table.body[3][0].table.body.splice(0,1);
				pdfMake.createPdf(pdfdd).open({}, win);
			});
		}		
	});
}



$scope.fileIndxExcel = async function fileIndxExcel() {
	var paramdata = {} ; 
	var todaysDt = appToday() ;

	$http.get('../fileindx/CurrentCoData').then(function(response) {
	  	if (!response.data.CO_CODE) {
	  		$scope.isIncorrectGroup = true;
	  	} else {	
			paramdata.CO_CODE = response.data.CO_CODE ;
			paramdata.CO_NAME = response.data.COMPANY ;
			var withInactive = ( $scope.showInactive ? "1" : "0")

			$http.get('/fileindx/filesdata/' + $scope.ReportOption +"-" + withInactive ).then( async function(response) {
				var reportOption = ''
				if($scope.ReportOption === '1') {
					reportOption = 'Group wise'
				}

				if($scope.ReportOption === '2') {
					reportOption = 'File Number wise'
				}

				if($scope.ReportOption === '3') {
					reportOption = 'Party Name wise'
				}

				const wb = new ExcelJS.Workbook()
				wb.created  = new Date();
				wb.creator = 'A V Solutions' 
	
				const ws = wb.addWorksheet("FileIndex");
	
				ws.addRow(["H. B. Gala & Co. & Associated Firms"," "]);
				ws.mergeCells('A1:D1');
				ws.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
					
				ws.getCell('A1').font = {
					name: 'Arial',
					family: 4,
					size: 16,
					underline: true,
					bold: true
				};
				
				ws.addRow([reportOption + " - File Index"," "]);
				ws.mergeCells('A2:D2');
				ws.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };
				ws.getCell('A2').font = {
					name: 'Arial',
					family: 4,
					size: 14,
				};
	
				ws.addRow([" "," "]);
	
				ws.addRow(["Print Date : " + todaysDt," "]);
				ws.mergeCells('A4:B4');
	
				ws.addRow(["File No", "Party Name","File No", "Party Name"  ]);
	
				ws.getColumn(2).width = 50
				ws.getColumn(4).width = 50
		
				for(var i=1; i < 5 ; i++){
					var row = ws.getRow(5);		
					var currentCell = row.getCell(i) ;
			
					currentCell.fill = {
					  type: 'pattern',
					  pattern:'solid',
					  fgColor:{argb:'FFD3D3D3'},
					  bgColor:{argb:'FFD3D3D3'}
					};
			
					currentCell.border = {
						top: {style:'thin'},
						bottom: {style:'thick'}
					};		
				}	
	
				//Create new Array to update left and right side
				var IndexData = []
				var leftEntry = true
				var pageLineNo = 1
				var currentLine = 1
				var grpId = ''
				var isNewGrp = false
				const LinesPerPage = 19
				const IsGrpWise = ($scope.ReportOption === '1')

				for(let i =0; i< response.data.length; i++ ) {
					isNewGrp = IsGrpWise === false ? false : (grpId !== response.data[i].GRP_CODE )

					if(pageLineNo > LinesPerPage) {
						leftEntry = !leftEntry
						pageLineNo = 1
						currentLine = ( leftEntry === false ? currentLine - LinesPerPage : currentLine)
					}

					if(leftEntry) {
//						if(isNewGrp) {
//							IndexData.push({ LCODE : response.data[i].GRP_CODE , LNAME : response.data[i].GRP_NAME, 
//								LGRP : true, RCODE : '' , RNAME : '' , RGRP : false  })	
//							currentLine++
//							pageLineNo++
//						}
						IndexData.push({ LCODE : response.data[i].AC_CODE , LNAME : response.data[i].AC_NAME, 
							LGRP : false , RCODE : '' , RNAME : '' , RGRP : false  } )
							
					} else {
//						if(isNewGrp) {
//							IndexData[currentLine - 1].RCODE = response.data[i].GRP_CODE
//							IndexData[currentLine - 1].RNAME = response.data[i].GRP_NAME
//							IndexData[currentLine - 1].RGRP = true
//							currentLine++
//							pageLineNo++
//						}

						if(pageLineNo > LinesPerPage) {
							IndexData.push({ LCODE : '' , LNAME : '' , 	LGRP : false , 
							RCODE : response.data[i].AC_CODE , RNAME : response.data[i].AC_NAME , RGRP : false  } )
						} else {
							IndexData[currentLine - 1].RCODE = response.data[i].AC_CODE
							IndexData[currentLine - 1].RNAME = response.data[i].AC_NAME
							IndexData[currentLine - 1].RGRP = false
						}
					}
					grpId = response.data[i].GRP_CODE
					currentLine++
					pageLineNo++
				}

				var strline = ''
				var newline = null
				for(let k=0; k< IndexData.length; k++ ) {
					ws.addRow([ IndexData[k].LCODE,  IndexData[k].LNAME, IndexData[k].RCODE , IndexData[k].RNAME]);
/*
					strline =  strtblData.replace('<<AC_CODE1>>', IndexData[k].LCODE) ;
					strline =  strline.replace('<<AC_NAME1>>', IndexData[k].LNAME) ;
					strline =  strline.replace('<<AC_CODE2>>', IndexData[k].RCODE) ;
					strline =  strline.replace('<<AC_NAME2>>', IndexData[k].RNAME) ;
					strline =  strline.replace(/LGRP/g, IndexData[k].LGRP) ;
					newline = JSON.parse(strline);
					if(IndexData[k].LGRP){
						newline[0].border[3] = true
						newline[1].border[3] = true
					}
					if(IndexData[k].RGRP){
						newline[3].border[3] = true
						newline[4].border[3] = true
					}
*/
				}

				const buf = await wb.xlsx.writeBuffer()
				saveAs(new Blob([buf]), 'FileIndex.xlsx')						  
	
			});
		}		
	});




}



/*

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
			jsonrow['CCC'] = billdata[i].CLIND ;

			jsonrow['TTT'] = 0 ;
			jsonrow['BBB'] = 0 ;

			if(xlData.length > 0) {
				xlData[xlData.length-1].TTT = billTot ;
				if(xlData[xlData.length-1].CCC == 'Y') {
					xlData[xlData.length-1].BBB = 0 ;
				} else {
					xlData[xlData.length-1].BBB = billTot - xlData[xlData.length-1].RRR ;	
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
	var balTotal = 0 ;
	for(var j=0; j < xlData.length ; j++){
		ostTotal = ostTotal + xlData[j].OST ;
		rcptTotal = rcptTotal + xlData[j].RRR ;
		balTotal = balTotal + xlData[j].BBB ;			
	}
	jsonrow.OST = ostTotal ;

	GTotal = GTotal + ostTotal ;
	jsonrow.TTT = GTotal ;

	jsonrow.RRR = rcptTotal ;
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
			jsonrow['CCC'] = billdata[i].CLIND ;

			jsonrow['TTT'] = 0 ;
			jsonrow['BBB'] = 0 ;


			if(xlData.length > 0) {
				xlData[xlData.length-1].TTT = billTot ;
				if(xlData[xlData.length-1].CCC == 'Y') {
					xlData[xlData.length-1].BBB = 0 ;
				} else {
					xlData[xlData.length-1].BBB = billTot - xlData[xlData.length-1].RRR ;	
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
	var balTotal = 0 ;

	for(var j=0; j < xlData.length ; j++){
		ostTotal = ostTotal + xlData[j].OST ;
		rcptTotal = rcptTotal + xlData[j].RRR ;
		balTotal = balTotal + xlData[j].BBB ;			
	}
	jsonrow.OST = ostTotal ;

	GTotal = GTotal + ostTotal ;
	jsonrow.TTT = GTotal ;
	jsonrow.RRR = rcptTotal ;
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


*/

}]); 
//End of controller : fileindxCntrl




