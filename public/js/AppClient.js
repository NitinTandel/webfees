// Main file for Webpack

/*
const config = {
	apiURLDev : "http://localhost:4000"  , 
	apiURLProd : "http://192.168.0.107:4000" , 
	currentEnv : "Dev"
};
*/


function getAPIUrl(){
	if (this.config.currentEnv == "Dev") return this.config.apiURLDev
	if (this.config.currentEnv == "Prod") return this.config.apiURLProd
}

function XMLstring(str) {
	var rtnstr =  str.replace(/&/g, "&amp;" ) ;
	rtnstr =  rtnstr.replace(/'/g, "&apos;" ) ;
	rtnstr =  rtnstr.replace(/"/g, "&quot;" ) ;
    return rtnstr;
}



/*msgType 0 = Success, 1 = Error, 2 = Warning ,  3 = Information */
function ShowSnackbar(msg, msgType) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  var bgColor = ((msgType == 1) ?  "alert alert-danger" : "alert alert-success") ;

  // Add the "show" class to DIV
  x.className = "show";
  x.innerHTML = msg ;

//  x.background-color = bgColor ;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}



//Common functions

function dateinDDMMYYYY(mDt) {
	var dd = mDt.getDate();
	var mm = mDt.getMonth() + 1; //January is 0!
	var yyyy = mDt.getFullYear();

	if (dd < 10) {
  		dd = '0' + dd;
	} 
	if (mm < 10) {
  		mm = '0' + mm;
	} 
	var rtnstrDt = dd + '/' + mm + '/' + yyyy;	
    return rtnstrDt;
}


function dateinYYYYMMDD(mDt) {
	var dd = mDt.getDate();
	var mm = mDt.getMonth() + 1; //January is 0!
	var yyyy = mDt.getFullYear();

	if (dd < 10) {
  		dd = '0' + dd;
	} 
	if (mm < 10) {
  		mm = '0' + mm;
	} 
	var rtnstrDt = yyyy + '-' + mm + '-' + dd;	
    return rtnstrDt;
}


function appToday() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
	  dd = '0' + dd;
	} 
	if (mm < 10) {
	  mm = '0' + mm;
	} 
	var rtnVal = dd + '/' + mm + '/' + yyyy;

    return rtnVal;
}

function strDateDDMMYYYY(strDtYYYYMMDDD) {
	var rtnDt =  strDtYYYYMMDDD.substring(8,10) + "/" + strDtYYYYMMDDD.substring(5,7) + "/" + strDtYYYYMMDDD.substring(0,4);
	return rtnDt ;
}

function convertInWords (num) {
	var a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
	var b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'And ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]])  : '';
    return str;
}


function convertValidJSON(strVal) {
//	var rtnVal = strVal.replace(/\\["\\\/bfnrtu]/g, '@').
//		replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
//		replace(/(?:^|:|,)(?:\s*\[)+/g, '') ;
	var rtnVal = strVal.replace(/'/g, "");
	var rtnVal = rtnVal.replace(/"/g, "") ;
	var rtnVal = rtnVal.replace(/\\/g, "-") ;

	return rtnVal ;	
}

function numberWithCommas(x) {
//    x = ((typeof x === "undefined") ? 0 : x);
    x = ( x === null ? 0 : x);

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



