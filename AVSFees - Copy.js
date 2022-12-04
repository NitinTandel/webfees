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


// Check the database connection
let db = new sqlite3.Database('./db/fees.db', sqlite3.OPEN_READWRITE, (err) => {
if (err) {
    console.error(err.message);
  }
  console.log('Connected to the fees database.');
  db.close();
});
 


var routes = require('./routes/index');
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


//var dashboard = require('./routes/dashboard');
//var common = require('./routes/common');


// Init App
var app = express();

// View Engine

handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});

app.set('views', path.join(__dirname, 'views'));
//app.set('views', path.join("C:/NitinWork/NodeProjects/WebFees", 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

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


//app.use('/dashboard', dashboard);
//app.use('/common', common);


// Set Port
app.set('port', port);

app.listen(app.get('port'), function(){
  console.log('Server started on port '+ app.get('port'));
});

