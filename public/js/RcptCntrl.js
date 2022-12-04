


FeesApp.controller('rcptCntrl', ['$scope', '$http' , '$q' ,  function($scope, $http , $q  ) {
	$scope.pagetitle = "Manage Receipts" 
	$scope.sortColumn = 'BILL_NO';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;

	$scope.pageDataLoaded  = false ;

	$scope.currentIndex = -1 ;
	$scope.selectedBill = {} ;
	$scope.osOnlyBills = false ;
	$scope.LockedforEdit = false ;
	$scope.CurrentRole = "NA" ;

	var refresh = function() {
	  if ($scope.osOnlyBills  ) {
		  $http.get('/receipts/listallOS').then(function(response) { 
		    $scope.billslist = response.data;
		  	$scope.pageDataLoaded  = true ;
		  });
	  }	else {
		  $http.get('/receipts/listall').then(function(response) { 
		    $scope.billslist = response.data;
		  	$scope.pageDataLoaded  = true ;
		  });
	  }
	
	  $http.get('/users/currentRole').then(function(response) {
		$scope.CurrentRole = response.data;
	  });    	

	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();



$scope.isValidDate = function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}


$scope.refreshData = function refreshData() {
	refresh();
}

//=============================================
//Edit the Bill
//============================================
    $scope.enterReceipts = function enterReceipts(row) {
	  	var selectedBillId = row.BILLID ;

	  	$http.get('/receipts/details/' +  selectedBillId).then(function(response) { 
	  		//console.log(response);

	    	$scope.selectedBill = response.data;

	    	if($scope.selectedBill.CASH1 == null) {
	    		$scope.selectedBill.CASH1 = 0
	    	}

	    	if($scope.selectedBill.CASH2 == null) {
	    		$scope.selectedBill.CASH2 = 0
	    	}

	    	if($scope.selectedBill.CHEQUE1 == null) {
	    		$scope.selectedBill.CHEQUE1 = 0
	    	}

	    	if($scope.selectedBill.CHEQUE2 == null) {
	    		$scope.selectedBill.CHEQUE2 = 0
	    	}

//	    	Find if the current bill is closed
	    	$scope.selectedBill.isClosed = (($scope.selectedBill.CLIND == "C") ? true : (($scope.selectedBill.CLIND == "Y") ? true : false));
//          Stores the old value to identify if the value is changed now
	    	$scope.selectedBill.isClosedOld = $scope.selectedBill.isClosed ;
	    	$scope.LockedforEdit = $scope.selectedBill.isClosedOld ;

			$scope.selectedBill.selectedbillDt = new Date($scope.selectedBill.BILL_DT);

			if($scope.selectedBill.RCPT_DATE != null) {
				$scope.selectedBill.RcptDt1 = new Date($scope.selectedBill.RCPT_DATE);
			}

			if($scope.selectedBill.RCPT_DATE2 != null) {				
				$scope.selectedBill.RcptDt2 = new Date($scope.selectedBill.RCPT_DATE2);
			}

//	    	console.log($scope.selectedBill.RcptDt2);

			var index = $scope.billslist.indexOf(row);
			 $scope.currentIndex = index ;
			    if (index !== -1) {
			      	$('#EditReceipt').modal();
			    }	


	  	});    	
    }

	$scope.allowEdit = function() {
		$scope.LockedforEdit = false ;
	};	

	$scope.modifyReceipt = function(sReceiptdata) {
	  $http.post('/receipts/update', sReceiptdata).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  });
	};

	$scope.getRcptTotal = function(){
		$scope.selectedBill.CASH = $scope.selectedBill.CASH1 + $scope.selectedBill.CASH2
		$scope.selectedBill.CHEQUE = $scope.selectedBill.CHEQUE1 + $scope.selectedBill.CHEQUE2
		$scope.selectedBill.RCPT_AMT = $scope.selectedBill.CASH + $scope.selectedBill.CHEQUE
		$scope.selectedBill.BAL_AMT = $scope.selectedBill.TOT_AMT - $scope.selectedBill.RCPT_AMT - $scope.selectedBill.TDS_AMT
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


//End of controller : RcptCntrl

