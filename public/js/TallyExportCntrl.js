

FeesApp.controller('TallyExportCntrl', ['$scope', '$http',  '$location', '$q', function($scope, $http,  $location, $q ) {
	$scope.pagetitle = "Export to Tally" 
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;
	$scope.selectedComp = {} ;
	$scope.tallyconfig = {} ;
	$scope.tallyconfig.TALLYSERVER = " " ;
	$scope.tallyconfig.TALLYEXPORTPARTYOPTION = 1 ;
	$scope.tallyconfig.TALLYLEDGER = "Not Available" ;
	$scope.tallyconfig.isReExport = false ;
	$scope.pageDataLoaded  = false ;
	$scope.showProgress  = false ;
	$scope.progressComVal  = 0 ;



	var refresh = function() {
	  $http.get('../Parties/listall').then(function(response) { 
	    $scope.partylist = response.data;
	  	$scope.pageDataLoaded  = true ;
	  });

	  $http.get('../billreg/CurrentYearData').then(function(response) {
		$scope.dtFromDate = new Date(response.data.FROM_DT) ;
		$scope.dtToDate = new Date(response.data.TO_DT) ;
	  });

	  $http.get('/tallyexport/TallyConfig').then(function(response) {
		for(var i=0; i < response.data.length ; i++){
		    if(response.data[i].config_field == "TALLYSERVER" ){
				$scope.tallyconfig.TALLYSERVER = response.data[i].config_value_str ;
				//console.log()
		  	}

		    if(response.data[i].config_field == "TALLYEXPORTPARTYOPTION" ){
				$scope.tallyconfig.TALLYEXPORTPARTYOPTION = response.data[i].config_value_str ;
		  	}

		    if(response.data[i].config_field == "TALLYLEDGER" ){
				$scope.tallyconfig.TALLYLEDGER = response.data[i].config_value_str ;
		  	}

		  }
	  });

	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};
	refresh();


$scope.ExportCancel = function ExportCancel() {
	var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
	console.log(approotpath);
	window.open(approotpath,"_self");
}


$scope.ExportTallyData = function ExportTallyData() {
	var processExport = true ;
	var selectioncount = 0 ;
	var dataOptions = JSON.parse('{"TALLYSERVER" : " ", "exportscope" : 1, "reExport" : false , "FROM_DT" : "", "TO_DT" : "",  "grouplist" : "NA", "partylist" : "NA"}' ) ;

	dataOptions.exportscope = $scope.ExportOption  ; 

	if ($scope.ExportOption == 2) {
		var selpartystring = "(" ;
		for(var i=0; i < $scope.partylist.length ; i++){
		    if($scope.partylist[i].CHECKED ){
		    	selpartystring = selpartystring + "'" + $scope.partylist[i].AC_CODE + "'," ;
		    	selectioncount = selectioncount + 1 ;
		  	}
		  }
		if (selectioncount > 0) {
			selpartystring = selpartystring.substr(0, selpartystring.length - 1) + ")";
		}  else {
			selpartystring = "( 'NA' )";
		}
		dataOptions.exportscope = 2  ; 
		dataOptions.partylist = selpartystring ;
	} 


	if($scope.ExportOption == 2 && selectioncount == 0 ) {
		processExport = false ;
	}

	dataOptions.TALLYSERVER =  $scope.tallyconfig.TALLYSERVER ;
	dataOptions.reExport =  $scope.tallyconfig.isReExport ;
	dataOptions.FROM_DT = dateinYYYYMMDD($scope.dtFromDate) ;
	dataOptions.TO_DT = dateinYYYYMMDD($scope.dtToDate) ;

	//Save the Tally sever value
	$http.post('/tallyexport/UpdateTServer', dataOptions).then(function(response) {
		//now get data for Exporting Receipts
		if($scope.ExportOption == 1) {
			$http.post('/tallyexport/rcptexpdata', dataOptions).then(function(response) {
				var rcptData = response.data ;

				if(rcptData.length > 0) {
					var errorcount = 0 ;
					var successcount = 0 ;
					var promises = [];
					$scope.showProgress  = true ;				
//	      			for(var i=0; i < rcptData.length ; i++) {
						//var rdata = rcptData[i];
					var i = 0 ;	
					rcptData.forEach(function(row){
						var mypromise = $http.post('/tallyexport/SendtoTally', row);
						promises.push(mypromise);						
						i++ ;
						$scope.progressComVal  = ( i / (rcptData.length * 2) * 100) ;
					});	
	      			$q.all(promises).then(function(results){	      				
	      				results.forEach(function(data,status){
	      					if(data.data.error == "No") {
	      						successcount++ ;	
	      					} else {
	      						errorcount++ ;
	      					}
	      					i++;
	      					$scope.progressComVal  = ( i / (rcptData.length * 2) * 100) ;
	      				});
	      				//console.log(promises);
		      			$scope.rtnMessage = " "
		      			if(successcount != 0){
		      				$scope.rtnMessage = $scope.rtnMessage + successcount + " Receipts created in Tally!" ;	
		      			}
		      			if(successcount != 0){
		      				$scope.rtnMessage = "\n" + $scope.rtnMessage +  errorcount + " Receipts could not be exported to Tally!" ;	
		      			}
		      			ShowSnackbar($scope.rtnMessage , 0) ;
		      			$scope.showProgress  = false ;
						//ShowSnackbar("Export completed" , 0) ;
	      			});		      			
				} else {
					ShowSnackbar("No Receipts available for export!" , 0) ;
				}
			});
		} else {
			if(processExport) { 
				$http.post('/tallyexport/SendCCtoTally', dataOptions).then(function(response) {
				  	$scope.rtnMessage = response.data.message ;
				  	$scope.isRtnMsgErr = response.data.error ;

				  	ShowSnackbar($scope.rtnMessage , 0) ;
				});	
			}	
		}
	});

}


$scope.sendBillsTally = function sendBillsTally(rcpttoExp, dataOptions) {
	var delay = $q.defer();
	var dataToExport = dataOptions ;
	dataToExport.rcptData = rcpttoExp ;

	$http.post('/tallyexport/SendtoTally', dataToExport).then(function(response) {
		console.log(response.data);
		delay.resolve(response);
	});	
	return delay.promise;
}


$scope.ExportTallyDatafull = function ExportTallyData() {
	var processExport = true ;
	var selectioncount = 0 ;
	var dataOptions = JSON.parse('{"TALLYSERVER" : " ", "exportscope" : 1, "reExport" : false , "FROM_DT" : "", "TO_DT" : "",  "grouplist" : "NA", "partylist" : "NA"}' ) ;
	dataOptions.exportscope = $scope.ExportOption  ; 

	if ($scope.ExportOption == 2) {
		var selpartystring = "(" ;
		for(var i=0; i < $scope.partylist.length ; i++){
		    if($scope.partylist[i].CHECKED ){
		    	selpartystring = selpartystring + "'" + $scope.partylist[i].AC_CODE + "'," ;
		    	selectioncount = selectioncount + 1 ;
		  	}
		  }
		if (selectioncount > 0) {
			selpartystring = selpartystring.substr(0, selpartystring.length - 1) + ")";
		}  else {
			selpartystring = "( 'NA' )";
		}
		dataOptions.exportscope = 2  ; 
		dataOptions.partylist = selpartystring ;
	} 


	if($scope.ExportOption == 2 && selectioncount == 0 ) {
		processExport = false ;
	}

	dataOptions.TALLYSERVER =  $scope.tallyconfig.TALLYSERVER ;
	dataOptions.reExport =  $scope.tallyconfig.isReExport ;
	dataOptions.FROM_DT = dateinYYYYMMDD($scope.dtFromDate) ;
	dataOptions.TO_DT = dateinYYYYMMDD($scope.dtToDate) ;


	//Save the Tally sever value
	$http.post('/tallyexport/UpdateTServer', dataOptions).then(function(response) {
		//now get data for Exporting Receipts
		if($scope.ExportOption == 1) {
			$http.post('/tallyexport/SendtoTally', dataOptions).then(function(response) {
				$scope.rtnMessage = response.data.message ;
				$scope.isRtnMsgErr = response.data.error ;

				ShowSnackbar($scope.rtnMessage , 0) ;
			});
		} else {
			if(processExport) { 
				$http.post('/tallyexport/SendCCtoTally', dataOptions).then(function(response) {
				  	$scope.rtnMessage = response.data.message ;
				  	$scope.isRtnMsgErr = response.data.error ;

				  	ShowSnackbar($scope.rtnMessage , 0) ;
				});	
			}	
		}
	});

}





}]); //End of controller : TallyExportCntrl






