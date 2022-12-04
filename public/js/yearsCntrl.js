

FeesApp.controller('yearsCntrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope  ) {
	$scope.pagetitle = "Manage Years Data" 
	$scope.sortColumn = 'YEAR';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.rtnMessage = "" ;

	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;
	$scope.currentIndex = -1 ;
	$scope.pageDataLoaded  = false ;


	var refresh = function() {
	  $http.get('/years/listall').then(function(response) { 
	    $scope.yearslist = response.data;
	  	$scope.pageDataLoaded  = true ;
	  });
	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();




//=============================================
//Add new group
//============================================
    $scope.addYear = function addTrcd() {
    	$scope.rtnMessage="" ;
      	$('#AddNewYear').modal();
    }

	$scope.registerNewYear = function(sYear) {
	  $http.post('/Years/register', sYear).then(function(response) {	  	
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  	ShowSnackbar($scope.rtnMessage , 0) ;
	  });
	};


//=============================================
//Edit Trcd
//============================================
    $scope.editYear = function editYear(row) {
	  	var selectedYear = row.YEAR ;	
	  	$http.get('/Years/details/' +  selectedYear).then(function(response) { 
	    	$scope.selectedYear = response.data;


			if($scope.selectedYear.FROM_DT != null) {
				$scope.selectedYear.FROM_DT_ENTRY = new Date($scope.selectedYear.FROM_DT);
			}

			if($scope.selectedYear.TO_DT != null) {
				$scope.selectedYear.TO_DT_ENTRY = new Date($scope.selectedYear.TO_DT);
			}

			if($scope.selectedYear.IT_DUE_DT1 != null) {
				$scope.selectedYear.IT_DUE_DT1_ENTRY = new Date($scope.selectedYear.IT_DUE_DT1);
			}

			if($scope.selectedYear.IT_DUE_DT2 != null) {
				$scope.selectedYear.IT_DUE_DT2_ENTRY = new Date($scope.selectedYear.IT_DUE_DT2);
			}

			if($scope.selectedYear.IT_DUE_DT3 != null) {
				$scope.selectedYear.IT_DUE_DT3_ENTRY = new Date($scope.selectedYear.IT_DUE_DT3);
			}

			if($scope.selectedYear.IT_DUE_DT4 != null) {
				$scope.selectedYear.IT_DUE_DT4_ENTRY = new Date($scope.selectedYear.IT_DUE_DT4);
			}

	  	});
		$scope.rtnMessage="" ;
	    var index = $scope.yearslist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#EditYear').modal();
	    }
    }

	$scope.modifyYear = function(period) {
	  $http.post('/Years/update', period).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  	ShowSnackbar($scope.rtnMessage , 0) ;
	  });
	};


//=============================================
//Delete Trcd
//============================================
    $scope.removeYear = function removeYear(row) {
    $scope.selectedYear = row ;
//	$scope.deleteCO_ID = row.CO_CODE ;
    var index = $scope.yearslist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteYear').modal();
        }
    }

    $scope.deleteYear = function deleteYear(sYear, currentIndex) {
        if (currentIndex !== -1) {
		  $http.post('/trcds/delete/' + sYear  , []).then(function(response) {
		    $scope.rtnMessage = response.data.message ;
	  		$scope.isRtnMsgErr = response.data.error ;
            $scope.yearslist.splice(currentIndex, 1);
		    refresh();
	  		ShowSnackbar($scope.rtnMessage , 0) ;
		  });
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
}]); //End of controller : trcdCntrl


