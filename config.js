var path = require('path');

module.exports = {
   'baseurl' :'http://localhost',
	'apiURLDev' : "http://localhost:4000"  , 
	'apiURLProd' : "http://192.168.0.107:4000" , 
	'currentEnv' : "DEV",

   'serverport':4000,
   'tokenexp': 3600,
   'secret': 'avsnitin',
   'database': '/webfees/db/Fees.db',
//   'apppath' : 'E:/WebFees'
   'apppath' :'/webfees'
};


