

FeesApp.controller('trcdsubCntrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope  ) {
	$scope.pagetitle = "Manage Sub-transaction Codes" 
	$scope.sortColumn = 'TRCD';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;

	$scope.currentIndex = -1 ;
	$scope.isIncorrectTrcd = false;
	$scope.pageDataLoaded  = false ;


	var refresh = function() {
	  $http.get('/trcdsubs/listall').then(function(response) { 
	    $scope.trcdsublist = response.data;
	  	$scope.pageDataLoaded  = true ;
	  });

	  $http.get('/trcdsubs/trcdlist').then(function(response) { 
	    $scope.trcdlist = response.data;
	  });
	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();


//=============================================
//Get the group code based on group name
//============================================
    $scope.getSelectedTrcdID = function getSelectedTrcdID(trcdNm) {
	  $http.get('/trcdsubs/currentTrcdID/' + trcdNm).then(function(response) {
	  	if (!response.data.TRCD) {
	  		$scope.isIncorrectTrcd = true;
	  	}else {
	  		$scope.selectedTrcdsub.TRCD = response.data.TRCD ; 	
	  		$scope.isIncorrectTrcd = false ;
	  	}
	  });
    }



//=============================================
//Add new Trcdsub
//============================================
    $scope.addTrcdsub = function addTrcdsub() {
    	$scope.rtnMessage="" ;
      	$('#AddNewTrcdsub').modal();
    }

	$scope.registerNewTrcdsub = function(nTrcdsub) {
	  $http.post('/trcdsubs/register', nTrcdsub).then(function(response) {	  	
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  	ShowSnackbar($scope.rtnMessage , 0) ;

	  });
	};


//=============================================
//Edit Trcd
//============================================
    $scope.editTrcdsub = function editTrcdsub(row) {
	  	var selectedTrcdId = row.TRCD + '-' + row.SUBCD ;	
	  	$http.get('/trcdsubs/details/' +  selectedTrcdId).then(function(response) { 
	    	$scope.selectedTrcdsub = response.data;
	  	});
		$scope.rtnMessage="" ;
	    var index = $scope.trcdsublist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#editTrcdsub').modal();
	    }
    }

	$scope.modifyTrcdsub = function(trcdsub) {
	  $http.post('/trcdsubs/update', trcdsub).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  	ShowSnackbar($scope.rtnMessage , 0) ;

	  });
	};


//==================================================================================
//Delete Trcd
//==================================================================================
    $scope.removeTrcdsub = function removeTrcdsub(row) {
    $scope.selectedTrcdsub = row ;

    var index = $scope.trcdsublist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteTrcdsub').modal();
        }
    }

    $scope.deleteTrcdsub = function deleteTrcdsub(trcd, currentIndex) {
        if (currentIndex !== -1) {
        	//First call http delete from database
		  $http.post('/trcdsubs/delete/' + trcd  , []).then(function(response) {
		    $scope.rtnMessage = response.data.message ;
	  		$scope.isRtnMsgErr = response.data.error ;
            $scope.trcdlistsub.splice(currentIndex, 1);
		    refresh();
	  		ShowSnackbar($scope.rtnMessage , 0) ;
		  });
        }
    }


//=====================================================================================
// List order by
//=====================================================================================
	$scope.orderByMe = function(x) {
    	if ( x === $scope.sortColumn ) {
    		$scope.sortReverse = $scope.sortReverse ? false : true;
    	} else {
    		$scope.sortColumn = x;	
    		$scope.sortReverse = false;
    	}
  	}
}]); //End of controller : trcdsubCntrl




