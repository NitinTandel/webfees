//'use strict';

//var CommonFunc = module.exports = {};
var FeesApp = module.exports = {};
//var CommonFunc = require('./AppClient.js');
//var FeesApp = require('./controllers.js');


require('./AppClient.js');
require('./controllers.js');
require('./CompanyCntrl.js');
require('./GroupCntrl.js');
require('./PartyCntrl');
require('./trcdCntrl');
require('./trcdsubCntrl');
require('./billsCntrl');
require('./RcptCntrl');
require('./OSCntrl');
require('./BillRegCntrl');
require('./LedgerCntrl');
require('./rcptregCntrl');
require('./navMenuCntrl');




/*
var angular = require('angular');

require('./AppClient.js');
angular.module('FeesApp').controller('UserListCntrl', require('./controllers'));
angular.module('FeesApp').directive('compareTo', require('./controllers'));
angular.module('FeesApp').directive('feesappPageHeader', require('./controllers'));
angular.module('FeesApp').controller('companyCntrl', require('./CompanyCntrl'));
angular.module('FeesApp').controller('groupCntrl', require('./GroupCntrl'));
angular.module('FeesApp').controller('partyCntrl', require('./PartyCntrl'));
angular.module('FeesApp').controller('trcdCntrl', require('./trcdCntrl'));
angular.module('FeesApp').controller('trcdsubCntrl', require('./trcdsubCntrl'));
angular.module('FeesApp').controller('billsCntrl', require('./billsCntrl'));
angular.module('FeesApp').controller('rcptCntrl', require('./RcptCntrl'));
angular.module('FeesApp').controller('osCntrl', require('./OSCntrl'));
angular.module('FeesApp').controller('BillRegCntrl', require('./BillRegCntrl'));
angular.module('FeesApp').controller('LedgerCntrl', require('./LedgerCntrl'));
angular.module('FeesApp').controller('rcptregCntrl', require('./rcptregCntrl'));
angular.module('FeesApp').controller('navBarCntrl', require('./navMenuCntrl'));
angular.module('FeesApp').controller('navMenuCntrl', require('./navMenuCntrl'));


*/

