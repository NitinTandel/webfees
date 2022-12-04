
FeesApp.controller('partyCntrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.pagetitle = "Manage Parties" 
	$scope.sortColumn = 'AC_CODE';
	$scope.sortReverse = false;
//	$scope.searchQuery = '{GRP_CODE: search.GRP_CODE, GRP_NAME: search.GRP_NAME, AC_CODE: search.AC_CODE, AC_NAME: search.AC_NAME }';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values

	$scope.lshowRtnMsg = false ; 

	$scope.rtnMessageColor = "alert alert-success" ;

	$scope.currentIndex = -1 ;
	$scope.selectedPrt = {} ;

	$scope.isIncorrectGroup = false;
	$scope.pageDataLoaded  = false ;

	$scope.showInactive = false ;


	var refresh = function() {
	  if ($scope.showInactive  ) {
		  $http.get('/Parties/listall').then(function(response) { 
		    $scope.partylist = response.data;
		  	$scope.pageDataLoaded  = true ;
		  });
	  } else{
		  $http.get('/Parties/listActive').then(function(response) { 
		    $scope.partylist = response.data;
		  	$scope.pageDataLoaded  = true ;
		  });	  	
	  }

	  $http.get('/Parties/namelist').then(function(response) { 
	    $scope.partynamelist = response.data;
	  });

	  $http.get('/Parties/grouplist').then(function(response) { 
	    $scope.grouplist = response.data;
	  });
	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;

	};

	refresh();


$scope.refreshData = function refreshData() {
	refresh();
}


//=============================================
//Get the group code based on group name
//============================================
    $scope.getSelectedGrpID = function getSelectedGrpID(grpNm, strAction) {
	  $http.get('/Parties/currentGroupID/' + grpNm).then(function(response) {
	  	if (!response.data.GRP_CODE) {
	  		$scope.isIncorrectGroup = true;
	  	}else {
	  		if(strAction =="ADD") {
	  			$scope.Prt.GRP_CODE = response.data.GRP_CODE ; 		
	  		} else {
	  			$scope.selectedPrt.GRP_CODE = response.data.GRP_CODE ; 		
	  		}
	  		
	  		$scope.isIncorrectGroup = false ;
	  	}
	  });
    }

//=============================================
//Get the Group Name  based on Group code
//============================================
$scope.getSelectedGrpName = function getSelectedGrpName(grpID, strAction) {
    if(grpID != "") {	
		$http.get('/Parties/currentGroupNm/' + grpID).then(function(response) {
		  	if (!response.data.GRP_NAME) {
		  		$scope.isIncorrectGroup = true;
		  	}else {
	  			if(strAction =="ADD") {
		  			$scope.Prt.GRP_NAME = response.data.GRP_NAME ;
		  		} else {
		  			$scope.selectedPrt.GRP_NAME = response.data.GRP_NAME ;
		  		}
		  	}
		 });
	}	  
}


$scope.setSEX = function setSEX() {
   if($scope.selectedPrt.ORG_TYPE != 0) {
    	$scope.selectedPrt.SEX = "N" ; 
   }
}


//=============================================
//Add new party
//============================================
    $scope.addParty = function addParty() {
    	$scope.rtnMessage="" ;
      	$('#AddNewParty').modal();
    }

	$scope.registerNewParty = function(newparty) {
	  $http.post('/Parties/register', newparty).then(function(response) {	  	
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	  	ShowSnackbar($scope.rtnMessage , 0) ;

	    refresh();
	  });
	};


//=============================================
//Edit the Group
//============================================
    $scope.editParty = function editParty(row) {
	  	var selectedPrtId = row.AC_CODE ;	
	  	$http.get('/Parties/details/' +  selectedPrtId).then(function(response) { 
	    	$scope.selectedPrt = response.data;
	    	$scope.selectedPrt.ACTIVESTATUS = (response.data.STATUS != 0  ) ;
	    	$scope.selectedPrt.ADV_TAX_OPT = (response.data.ADV_TAX != 0 ) ;
	    	$scope.selectedPrt.TAX_AUDIT_OPT = (response.data.TAX_AUDIT != 0 ) ;
	    	$scope.selectedPrt.GST_APPL_OPT = (response.data.GST_APPLICABLE != 0 ) ;
	    	$scope.selectedPrt.TDS_APPL_OPT = (response.data.TDS_APPLICABLE != 0 ) ;

			if($scope.selectedPrt.DOB != null) {
				$scope.selectedPrt.DOB = new Date(response.data.DOB);
			}

	  	});    	

		$scope.rtnMessage="" ;
	    var index = $scope.partylist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#EditParty').modal();
	    }
    }

	$scope.modifyParty = function(party) {
	  $http.post('/Parties/update', party).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	  	ShowSnackbar($scope.rtnMessage , 0) ;
	    refresh();
	  });
	};


//=============================================
//Delete the Group
//============================================
    $scope.removeParty = function removeParty(row) {
    $scope.selectedPrt = row ;
//	$scope.deleteCO_ID = row.CO_CODE ;
    var index = $scope.partylist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteParty').modal();
        }
    }

    $scope.deleteParty = function deleteParty(prtId, currentIndex) {
        if (currentIndex !== -1) {
        	//First call http delete from database
		  $http.post('/parties/delete/' + prtId  , []).then(function(response) {
		    $scope.rtnMessage = response.data.message ;
	  		$scope.isRtnMsgErr = response.data.error ;
            $scope.partylist.splice(currentIndex, 1);
		    refresh();
		  });
        }
    }



//=============================================
//Get the PartyCode code based on Party name
//============================================
    $scope.getSelectedPrtID = function getSelectedPrtID(PartyNm) {
    	if(PartyNm != "") {	
		  $http.get('/parties/currentPartyID/' + PartyNm).then(function(response) {
		  	if (!response.data.AC_CODE) {
		  		$scope.isIncorrectPartu = true;
		  		$scope.PrttoChange.AC_CODE = "Invalid Party !!" ;
		  	}else {
		  		$scope.PrttoChange.AC_CODE = response.data.AC_CODE ;
		  		$scope.isIncorrectGroup = false ;
		  	}
		  });
    	}
    }


//=============================================
//Change the party code of the selected party
//============================================
    $scope.changePartyCode = function changePartyCode(prtCode, action) {
    	if(action =="change") {
			$http.post('/Parties/changePartyCode' , [$scope.PrttoChange]).then(function(response) {
			    $scope.rtnMessage = response.data.message ;
		  		$scope.isRtnMsgErr = response.data.error ;
		  		$scope.lshowRtnMsg = true ;
	  			$scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	  			ShowSnackbar($scope.rtnMessage) ;
			});    		
    	} else {
    		$scope.lshowRtnMsg = false ;
			var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
			console.log(approotpath);
			window.open(approotpath,"_self");
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
}]); 


//End of controller : PartyCntrl




