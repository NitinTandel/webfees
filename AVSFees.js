//========================================================================================
// || om Shree Ganeshay Namha ||
//========================================================================================
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var handlebars = require('handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config');
var port = process.env.PORT || config.serverport ;
var sqlite3 = require('sqlite3').verbose();
const cors = require('cors')

//var dbpath = path.join(__dirname, 'db') + '/Fees.db' ;


// Check the database connection 
var db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
  if (err) {
      console.error(err.message);
  } else {
    console.log('Connected to the fees database.');
  }
  db.close();
});


var routes = require( './routes/index');
var menus = require('./routes/menus');
var users = require('./routes/users');
var dbdata = require('./routes/dbdata');
var company = require('./routes/company');
var groups = require('./routes/groups');
var parties = require('./routes/parties');
var trcds = require('./routes/trcds');
var trcdsubs = require('./routes/trcdsubs');
var bills = require('./routes/bills');
var receipts = require('./routes/receipts');
var outstandings = require('./routes/outstandings');
var billreg = require('./routes/billreg');
var ledgers = require('./routes/ledgers');
var rcptreg = require('./routes/rcptreg');
var tallyimport = require('./routes/tallyimport');
var tallyexport = require('./routes/tallyexport');
var years = require('./routes/years');
var fileindx = require('./routes/fileindx');
var billprint = require('./routes/billprint');


var viewspath = path.join(__dirname, 'views') ;
var publicpath = path.join(__dirname, 'public');
//var dashboard = require('./routes/dashboard');
//var common = require('./routes/common');

//console.log(__dirname)
//console.log(viewspath)

// Init App
var app = express();

// View Engine

handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});

// To work with webpack changed the code to hardcode the application path in config.js
//app.set('views', path.join(__dirname, 'views'));
//app.set('views', path.join("C:/NitinWork/NodeProjects/WebFees", 'views'));
app.set('views', viewspath);
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Set Static Folder
app.use(express.static(publicpath));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');

  res.locals.apiURLDev = req.flash('apiURLDev' );
  res.locals.apiURLProd = req.flash('apiURLProd');
  res.locals.currentEnv = req.flash('currentEnv');
  res.locals.isProdEnv = req.flash('isProdEnv');

  
  res.locals.user = req.user || null;
  next();
});


app.use('/', routes);
app.use('/menus', menus);
app.use('/users', users);
app.use('/dbdata', dbdata);
app.use('/company', company);
app.use('/groups', groups);
app.use('/parties', parties);
app.use('/trcds', trcds);
app.use('/trcdsubs', trcdsubs);
app.use('/bills', bills);
app.use('/receipts', receipts);
app.use('/outstandings', outstandings);
app.use('/billreg', billreg);
app.use('/ledgers', ledgers);
app.use('/rcptreg', rcptreg);
app.use('/tallyimport', tallyimport);
app.use('/tallyexport', tallyexport);
app.use('/years', years);
app.use('/fileindx', fileindx);
app.use('/billprint', billprint);


//app.use('/dashboard', dashboard);
//app.use('/common', common);

// Set Port
app.set('port', port);

app.listen(app.get('port'), function(){
  console.log('Server started on port '+ app.get('port'));
});


//========================================================================================
// Note:
// Pwd for Opening Excel Macro - 52291
//========================================================================================
