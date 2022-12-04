

FeesApp.controller('trcdCntrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope  ) {
	$scope.pagetitle = "Manage Transaction Codes" 
	$scope.sortColumn = 'TRCD';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.rtnMessage = "" ;

	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;
	$scope.currentIndex = -1 ;
	$scope.pageDataLoaded  = false ;


	var refresh = function() {
	  $http.get('/trcds/listall').then(function(response) { 
	    $scope.trcdlist = response.data;
	  	$scope.pageDataLoaded  = true ;
	  });
	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();


//=============================================
//Add new group
//============================================
    $scope.addTrcd = function addTrcd() {
    	$scope.rtnMessage="" ;
      	$('#AddNewTrcd').modal();
    }

	$scope.registerNewTrcd = function(nTrcd) {
	  $http.post('/trcds/register', nTrcd).then(function(response) {	  	
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  	ShowSnackbar($scope.rtnMessage , 0) ;
	  });
	};


//=============================================
//Edit Trcd
//============================================
    $scope.editTrcd = function editGroupTrcd(row) {
	  	var selectedTrcdId = row.TRCD ;	
	  	$http.get('/trcds/details/' +  selectedTrcdId).then(function(response) { 
	    	$scope.selectedTrcd = response.data;
	  	});
		$scope.rtnMessage="" ;
	    var index = $scope.trcdlist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#EditTrcd').modal();
	    }
    }

	$scope.modifyTrcd = function(trcd) {
	  $http.post('/trcds/update', trcd).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  	ShowSnackbar($scope.rtnMessage , 0) ;

	  });
	};


//=============================================
//Delete Trcd
//============================================
    $scope.removeTrcd = function removeTrcd(row) {
    $scope.selectedTrcd = row ;
//	$scope.deleteCO_ID = row.CO_CODE ;
    var index = $scope.trcdlist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteTrcd').modal();
        }
    }

    $scope.deleteTrcd = function deleteTrcd(trcd, currentIndex) {
        if (currentIndex !== -1) {
		  $http.post('/trcds/delete/' + trcd  , []).then(function(response) {
		    $scope.rtnMessage = response.data.message ;
	  		$scope.isRtnMsgErr = response.data.error ;
            $scope.trcdlist.splice(currentIndex, 1);
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




