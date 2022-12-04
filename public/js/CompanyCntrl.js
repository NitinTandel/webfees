

FeesApp.controller('companyCntrl', ['$scope', '$http', '$rootScope', '$location',  function($scope, $http, $rootScope , $location ) {
	$scope.pagetitle = "Manage Companies" 
	$scope.sortColumn = 'CO_CODE';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;

	$scope.confirmPassword = "" ;

	$scope.selectedComp = {} ;

//	$scope.selectedComp.CO_CODE = $rootScope.gblCoId ;
//	$scope.selectedComp.COMPANY = $rootScope.gblCoName ;


	var refresh = function() {
	  $http.get('/company/listall').then(function(response) { 
	    $scope.companylist = response.data;
	    $scope.codata = "";
	  });
	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();


//=============================================
//Add new user
//============================================
    $scope.addCompany = function addCompany() {
    	$scope.rtnMessage="" ;
      	$('#AddNewCompany').modal();
    }

	$scope.registerNewCompany = function(newcompany) {
	  $http.post('/company/register', newcompany).then(function(response) {	  	
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  });
	};


//=============================================
//Edit the user
//============================================
    $scope.editCompany = function editCompany(row) {
	  	var selectedCoId = row.CO_CODE ;	
	  	$http.get('/company/details/' +  selectedCoId).then(function(response) { 
	    	$scope.selectedCo = response.data;
	  	});
    	$scope.selectedCo = row ;
		$scope.rtnMessage="" ;
	    var index = $scope.companylist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#EditCompany').modal();
	    }
    }

	$scope.modifyCompany = function(company) {
	  $http.post('/company/update', company).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;

	    refresh();
	  });
	};


//=============================================
//Delete the user
//============================================
    $scope.removeCompany = function removeCompany(row) {
    $scope.selectedCo = row ;
	$scope.deleteCO_ID = row.CO_CODE ;
    var index = $scope.companylist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteCompany').modal();
        }
    }

    $scope.deleteCompany = function deleteCompany(companyid, currentIndex) {
        if (currentIndex !== -1) {
        	//First call http delete from database
		  $http.post('/company/delete/' + companyid  , []).then(function(response) {
		    $scope.rtnMessage = response.data.message ;
	  		$scope.isRtnMsgErr = response.data.error ;
            $scope.companylist.splice(currentIndex, 1);
		    refresh();
		  });
        }
    }



    $scope.changeCurrentCo = function changeCurrentCo(companyid, companyName) {
//		UserService.setCurrentCompany(companyid, companyName);
		$rootScope.gblCoId = companyid ;
		$rootScope.gblCoName = companyName ;
//		$location.path('/').replace();

		

		var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()

		console.log(approotpath);
		
		window.open(approotpath,"_self")		


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
}]); //End of controller 



