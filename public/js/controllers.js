

var FeesApp = angular.module('FeesApp', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});


FeesApp.controller('UserListCntrl', ['$scope', '$http',  '$location',  function($scope, $http , $location ) {
	$scope.pagetitle = "Manage Users" 
	$scope.sortColumn = 'USERID';
	$scope.sortReverse = false;
//	$scope.searchQury = '{USERID: search.USERID, USER_NAME: search.USER_NAME}';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values	
	$scope.confirmPassword = "" ;
	$scope.edituser = {} ;
	$scope.currentMenu = 0 ;

	$scope.selectedComp = {} ;


	$http.get('/company/listall').then(function(response) { 
	    $scope.companylist = response.data;
	});

	$http.get('/company/yearslist').then(function(response) { 
	    $scope.yearlist = response.data;
	});

	$scope.UpdtcPass = function(val) {
		$scope.confirmPassword = val ;		
	};

	var refresh = function() {
	  $http.get('/users/listall').then(function(response) { 
	    $scope.userlist = response.data;
	    $scope.userdata = "";
	    $scope.confirmPassword = "" ;
		//$scope.cpwd ="";	    		
	  });
	};

	refresh();


//=============================================
//Add new user
//============================================
    $scope.addUser = function addUser() {
    	$scope.rtnMessage="" ;
      	$('#AddNewUser').modal();
    }

	$scope.registerNewUser = function(user) {
	  $http.post('/users/register', $scope.user).then(function(response) {
	  	$scope.rtnMessage=response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    //console.log(response);
	    refresh();
	  });
	};


//=============================================
//Edit the user
//============================================
    $scope.editUser = function editUser(row) {
//    	$scope.edituser = row ;
    	var selectedUser = row.USERID ;	
	  	$http.get('/users/details/' +  selectedUser).then(function(response) { 
	    	$scope.edituser = response.data;
	  	});

		$scope.rtnMessage="" ;
	    var index = $scope.userlist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#EditUser').modal();
	    }
    }

	$scope.modifyUpdateUser = function(editeduser) {
	
	  $http.post('/users/updateUser', editeduser).then(function(response) {
	  	$scope.rtnMessage=response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
//	    console.log(response);
	    refresh();
	  });
	};


//=============================================
//Change Password for user
//============================================
    $scope.changePwd = function changePwd(row) {
    	$scope.cpwd = row ;
	    var index = $scope.userlist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#ChangePass').modal();
	    }
    }

	$scope.updateUserPwd = function(editeduser) {
	  $http.post('/users/changepass', editeduser).then(function(response) {
	    $scope.rtnMessage=response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;

	    //console.log(response.data.message);
	    //refresh();
	  });
	};


//=============================================
//Delete the user
//============================================
    $scope.removeUser = function removeUser(row) {
	$scope.deleteUSERID = row.USERID ;
    var index = $scope.userlist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteUser').modal();
        }
    }

    $scope.deleteUser = function deleteUser(userid, currentIndex) {
        if (currentIndex !== -1) {
        	//First call http delete from database
		  $http.post('/users/delete/' + userid  , []).then(function(response) {
		    $scope.rtnMessage=response.data.message ;
	  		$scope.isRtnMsgErr = response.data.error ;
            $scope.userlist.splice(currentIndex, 1);
		    refresh();
		  });
        }
    }


//=============================================
//Change the company of the  current user user
//============================================

    $scope.changeCurrentCo = function changeCurrentCo(comp, action) {
    	if(action =="change") {
			$http.post('/users/updateCurrentCo' , [comp]).then(function(response) {
			    $scope.rtnMessage=response.data.message ;
		  		$scope.isRtnMsgErr = response.data.error ;
			});    		
    	}

		var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
		console.log(approotpath);
		window.open(approotpath,"_self")		
    }


//=============================================
//Change the company of the  current user user
//============================================

    $scope.changeCurrentYear = function changeCurrentYear(yr, action) {
    	if(action =="change") {
			$http.post('/users/updateCurrentYr' , [yr]).then(function(response) {
			    $scope.rtnMessage=response.data.message ;
		  		$scope.isRtnMsgErr = response.data.error ;
			});    		
    	}

		var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
		console.log(approotpath);
		window.open(approotpath,"_self");
    }


//=============================================
//Change the Menu of the  current user user
//============================================

    $scope.changeCurrentMenu = function changeCurrentMenu(newMenu, action) {
    	if(action =="change") {
			$http.post('/users/updateCurrentMenu' , [newMenu]).then(function(response) {
			    $scope.rtnMessage=response.data.message ;
		  		$scope.isRtnMsgErr = response.data.error ;
			});    		
    	}

		var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
		console.log(approotpath);
		window.open(approotpath,"_self");
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



FeesApp.directive("compareTo", function() {
      return {
        require: "ngModel",
        $scope: {
          Password2: "=compareTo"
        },
        link: function($scope, element, attributes, modelVal) {
          modelVal.$validators.compareTo = function(val) {
            return val == $scope.confirmPassword;
          };

          $scope.$watch("Password2", function() {
            modelVal.$validate();
          });
        }
      };
});


FeesApp.directive("feesappPageHeader", function() {
	return {
		template : '<div class="page-header"><h3>[[pagetitle]]</h3></div>'
	}
});




//=============================================================================================
// Factories
//=============================================================================================

/*
FeesApp.factory('myFactory', function () {
  var _artist = '';
  var service = {}

  service.getArtist = function () {
    return _artist
  }

  return service;
})
*/

/*
FeesApp.factory('UserService', function() {
	var UserSrvObj = {}; 
	var localcurrentCompanyId = "Hello";
	var localcurrentCompanyName = "";

	UserSrvObj.getBillData = function(){
		return localcurrentCompanyId ;
	};	

	UserSrvObj.getCurrentCoName = function(){
		return localcurrentCompanyName ;
	};	

	UserSrvObj.setCurrentCompany = function(coID, coName){
		localcurrentCompanyId = coID ;
		localcurrentCompanyName = coName ;
	};	

 	return UserSrvObj;
});
*/

/*
FeesApp.factory('BillDataService', function($http, $q) {
	return{
		getBillData : function(id){
			var deffered = $q.defer();
		    var billData = {} ;
			$http.get('/bills/details/' +  id).success(function(response) { 
				var billData = response.data;
				$http.get('/bills/billtranctions/' +  id).then(function(response) { 
					deffered.resolve({
						billData.Transactions =  response.data;
						return billData;
					});
			    });
		    });
		    return deffered.promise ;	
		}
	}
});


FeesApp.factory('BillDataService', function($http, $q) {
	return{
		getBillData : function(id){
			return $http.get('/bills/billfulldata/' + id ) ;
		}
	}
});


*/





