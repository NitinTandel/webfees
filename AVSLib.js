//=====================================================================
//Some of the common functions
//=====================================================================
var mylib =  {};

//=====================================================================
//Private functions
//=====================================================================
function pad (num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}


//=====================================================================
//Public functions
//=====================================================================
mylib.formatDate = function formatDate(mdate) {
  var monthIndex = mdate.getMonth();
  var year = mdate.getFullYear();
  var day = mdate.getDate();
  return year + '-' + pad(monthIndex + 1, 2) + '-' + pad(day, 2);
}


mylib.getFinYear = function getFinYear(mdate) {
  var monthIndex = mdate.getMonth() + 1;
  var year = mdate.getFullYear();

  if(monthIndex <= 3) {
     var year1 = (year - 1)
     var year2 = year
  } else {
     var year1 = year 
     var year2 = year + 1
  }
   var strYear1 = year1.toString();
   var strYear2 = year2.toString();
   return strYear1 + '-' + strYear2.substring(2);
}

mylib.isValidDate = function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}


module.exports = mylib;

