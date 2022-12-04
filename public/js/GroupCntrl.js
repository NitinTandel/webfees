


FeesApp.controller('groupCntrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope  ) {
	$scope.pagetitle = "Manage Groups" 
	$scope.sortColumn = 'GRP_CODE';
	$scope.sortReverse = false;
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;

	$scope.currentIndex = -1 ;
	$scope.selectedGrp = {} ;
	$scope.pageDataLoaded  = false ;
	var refresh = function() {
	  $http.get('/groups/listall').then(function(response) { 
	    $scope.grouplist = response.data;
	  	$scope.pageDataLoaded  = true ;
	  });
	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;

	};

	refresh();


//=============================================
//Add new group
//============================================
    $scope.addGroup = function addGroup() {
    	$scope.rtnMessage="" ;
      	$('#AddNewGroup').modal();
    }

	$scope.registerNewGroup = function(newgroup) {
	  $http.post('/groups/register', newgroup).then(function(response) {	  	
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;

	  	ShowSnackbar($scope.rtnMessage , 0) ;

	    refresh();
	  });
	};


//=============================================
//Edit the Group
//============================================
    $scope.editGroup = function editGroup(row) {
	  	var selectedGrpId = row.GRP_CODE ;	
	  	$http.get('/groups/details/' +  selectedGrpId).then(function(response) { 
	    	$scope.selectedGrp = response.data;
	  	});
    	$scope.selectedGrp = row ;
		$scope.rtnMessage="" ;
	    var index = $scope.grouplist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#EditGroup').modal();
	    }
    }

	$scope.modifyGroup = function(grp) {
	  $http.post('/groups/update', grp).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;

	  	ShowSnackbar($scope.rtnMessage , 0) ;

	    refresh();
	  });
	};


//=============================================
//Delete the Group
//============================================
    $scope.removeGroup = function removeGroup(row) {
    $scope.selectedGrp = row ;
//	$scope.deleteCO_ID = row.CO_CODE ;
    var index = $scope.grouplist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteGroup').modal();
        }
    }

    $scope.printlistGroup = function printlistGroup() {
    	/*
		var blob = new Blob([document.getElementById('grplistmast').innerHTML], {
		        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
		    });
		    saveAs(blob, "Report.xls");
		 */
		 	// Worksheet column widths
			var wscols = [
			    {wch:10},
			    {wch:50},
			];

		    var wb = XLSX.utils.book_new();
		        wb.Props = {
		                Title: "Group Master",
		                Subject: "Group Master Report",
		                Author: "A V Solutions",
		                CreatedDate: new Date(2017,12,19)
		        };
				

		        wb.SheetNames.push("GroupMaster");

		       var createXLSLFormatObj = [];
		 
		        /* XLS Head Columns */
		        var xlsHeader = ["Group Id", "Group Name"];

    			createXLSLFormatObj.push(xlsHeader);

				for (i = 0; i < $scope.grouplist.length; i++) {
				  	var innerRowData = [];
				  	innerRowData.push($scope.grouplist[i].GRP_CODE);
				  	innerRowData.push($scope.grouplist[i].GRP_NAME);

				  	createXLSLFormatObj.push(innerRowData);
				}

		        var ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);

				ws['!cols'] = wscols;

		        wb.Sheets["GroupMaster"] = ws;
		        var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
		        function s2ab(s) {		  
		                var buf = new ArrayBuffer(s.length);
		                var view = new Uint8Array(buf);
		                for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
		                return buf;
		                
		        }
		        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'GroupMaster.xlsx');
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

}]); //End of controller : GroupCntrl





