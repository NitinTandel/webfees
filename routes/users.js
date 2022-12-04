var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const request = require('request');

//var config = require('../config');
var config = require( '/webfees/config');


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
      var rtnval =  "Authetication Failed !";
      console.log(rtnval);
      res.json({"message" : rtnval});
    }
}


//=================================================================================
// Get list of all users
//=================================================================================
router.get('/listall', ensureAuthenticated, function(req, res, next)  {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT USERID, USER_NAME, USER_EMAIL, ROLE, CURRENT_MENU FROM USERS", [], function(err, rows)  {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows);	
        	}
    	});
	});
    db.close();
});


//=================================================================================
// Get details of one User
//=================================================================================
router.get('/details/:Id', function(req, res, next)  {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ; 
  	} 
   		db.all("SELECT * FROM USERS WHERE USERID = ?", [ req.params.Id ], function(err, rows)  {
        	if (err) {
        		res.json(err.message);
        	} else {
        		res.json(rows[0]);	
        	}
    	});
	});
    db.close();
});


//=================================================================================
// Get role name of current user
//=================================================================================
router.get('/currentRole', function(req, res, next)  {
	res.json(req.user.ROLE);
});



//=================================================================================
// Login
//=================================================================================
router.get('/login', function(req, res, next){
    res.render('login');
});


router.post('/login',	
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/',failureFlash: true}),
  function(req, res) {
    res.redirect('/dashboard');
  });


passport.use(new LocalStrategy(
  function(userid, password, done) {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ; 
  	} else {
		  db.get("SELECT USERID, SALT FROM USERS WHERE USERID = '" +userid +"'",  function(err, row) {
		    if (!row) return done(null, false, {message: 'Unknown User ' +userid});
		    var hash = bcrypt.hashSync(password, row.SALT);
		    db.get('SELECT USERID, USER_NAME FROM USERS WHERE USERID = ? AND PASS = ?', userid, hash, function(err, row) {
		      if (!row) {
		      	return done(null, false, {message: 'Invalid password !!'});
		      } else {
		      	// update the curren menu
		      }
		      return done(null, row);
		    });
		  });
  		}
	});
    db.close();
 }));

passport.serializeUser(function(user, done) {
  done(null, user.USERID);
});

passport.deserializeUser(function(id, done) {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ; 
  	} else {
		  db.get('SELECT A.USERID, A.USER_NAME, A.ROLE, A.USER_EMAIL, A.DEFAULT_CO, B.COMPANY, A.DEFAULT_YEAR, A.CURRENT_MENU FROM users A LEFT JOIN COMPANY B ON A.DEFAULT_CO=B.CO_CODE WHERE userid = ?', id, function(err, row) {
		    if (!row) return done(null, false);
		    return done(null, row);
		  });
  		}
	});
    db.close();
});


router.get('/checkduplicateUser/:id', function(req, res){
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
    	res.json(err.message) ; 
  	} else {
		  db.get('SELECT * FROM users WHERE userid = ?', + req.params.Id, function(err, row) {
		    if (!row) return res.json({message:"OK"});
		    return res.json({message:"Error"});
		  });
  		}
	});
    db.close();
});



//=================================================================================
// Logout
//=================================================================================

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});


//=================================================================================
// Register new user
//=================================================================================

router.get('/manageusers', function(req, res, next){
    if (req.isAuthenticated()) {
        res.render('manageusers');
    } else {
      res.render('noaccess');
    }
});


// Register
router.get('/register', function(req, res){
	res.render('register');
});


// Register a new User
router.post('/register', function(req, res){
	var userid = req.body.userid;
	var username = req.body.username;
	var email = req.body.email;
	var role = req.body.role;
	var password = req.body.password;
	var password2 = req.body.password2;
	var defaultCoID = req.body.defaultCoID;
	var defaultYear = req.body.defaultYear;


	//if for duplicate user
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
		res.status(500).json({"message" : err.message, "error" : "Yes"});
  	} else {
		  db.get('SELECT * FROM users WHERE userid = ?', + req.params.Id, function(err, row) {
		    if (!row) {
//		    	db.close(); 
		    	var hash = bcrypt.hashSync(password, salt);
		    	var sqlstmt = "INSERT INTO USERS (USERID, USER_NAME, PASS, SALT, USER_EMAIL, ROLE, DEFAULT_CO, DEFAULT_YEAR) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )" ;
		        db.run(sqlstmt, [userid, username, hash, salt, email, role, defaultCoID, defaultYear], function(err, row){
		            if (err){
		            	res.status(500).json({"message" : err.message, "error" : "Yes"});
//						req.flash('error_msg', 'Cannot add ! database error!');
		            } else {
		            	res.status(202).json({"message" : 'User Added successfully!', "error" : "Yes"});
//		    			req.flash('success_msg', 'User Added successfully!');
		            }
		            res.end();
//		            db.close();
		        });
		    } else {
				//Flash error message		    	
				res.status(500).json({"message" : 'Cannot add ! UserID :' + req.params.Id + ' already exists!', "error" : "Yes"});
//				req.flash('error_msg', 'Cannot add ! UserID already exists!');
		    }
		  });
  		}
	});
    db.close();
});


//=================================================================================
// User Profile
//=================================================================================

router.get('/userprofile', function(req, res, next){
    res.render('userprofile');
});


// update the User
router.post('/updateUser', function(req, res){	
	var userid = req.body.USERID;
	var username = req.body.USER_NAME;
	var email = req.body.USER_EMAIL;
	var role = req.body.ROLE;
	var defaultCoName = req.body.selectedCOName;
	var defaultCoID = req.body.DEFAULT_CO;
	var defaultYear = req.body.DEFAULT_YEAR;

	//if user does not exists
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
		res.status(500).json({"message" : err.message, "error" : "Yes"});
  	} else {
  		  db.get('SELECT CO_CODE, COMPANY FROM COMPANY WHERE COMPANY = ? LIMIT 1', defaultCoName, function(err, row) {
  		  		if(row){
  		  			defaultCoID = row.CO_CODE;
  		  		}
  		  });

		  db.get('SELECT * FROM users WHERE USERID = ?', userid, function(err, row) {
		    if (!row) {
				//Flash error message
				res.status(500).json({"message" : 'Cannot update! UserID : ' + userid + ' does not exists!', "error" : "Yes"});
		    } else {
//		    	db.close(); 
		    	var sqlstmt = "UPDATE USERS SET USER_NAME = ?, USER_EMAIL = ?, ROLE = ?, DEFAULT_CO = ?, DEFAULT_YEAR = ? WHERE USERID = ?" ;
		        db.run(sqlstmt, [ username, email, role, defaultCoID, defaultYear, userid], function(err, row){
		            if (err){
		            	res.status(500).json({"message" : err.message, "error" : "Yes"});
		            } else {
		            	res.status(202).json({"message" : 'User updated successfully!', "error" : "No"});
		            }
		            res.end();
//		            db.close();
		        });
		    }
		  });
  		}
	});
    db.close();
});



//Forgot password
router.post('/forgot', function (req, res) {
    if (req.isAuthenticated()) {
        //user is alreay logged in
        return res.redirect('/');
    }
    User.forgot(req, res, function (err) {
        if (err) {
            req.flash('error', err);
        }
        else {
            req.flash('success', 'Please check your email for further instructions.');
        }
        res.redirect('/');
    });
});

// change a Password for the current user
router.post('/changepass', ensureAuthenticated, function(req, res){
	var userid = req.body.USERID;
	var newpassword = req.body.cPwd1;
	var newpassword2 = req.body.cPwd2;
	var request = require('request');

	req.checkBody('USERID', 'userid is required').notEmpty();
	req.checkBody('cPwd1', 'Password is required').notEmpty();
	req.checkBody('cPwd2', 'Passwords do not match').equals(req.body.cPwd1);
	var errors = req.validationErrors();

	if(errors){
		var ids = errors.map(x => x.msg);
		var errorlist = JSON.stringify(ids);	
		res.json({"message" : errorlist, "error" : "Yes"})
	} else {
		let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
			if(err){
				res.status(500).json({"message" : err.message, "error" : "Yes"});
			} else {
		    	var hash = bcrypt.hashSync(newpassword, salt);
				var sqlstmt = "UPDATE USERS SET PASS = ?, SALT = ? WHERE USERID = ?" ;
				db.run(sqlstmt, [ hash, salt, userid], function(err, row){
					if (err){
				    	res.status(500).json({"message" : err.message, "error" : "Yes"});
					} else {
				        res.status(202).json({"message" : "Password changed successfully!", "error" : "No"});
				    }
				    res.end();
			 	});				
			}
		});
		db.close();
	}
});


//===============================================================
//Delete user
//================================================================
router.post('/delete/:Id', function(req, res, next)  {
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
	if (err) {
		res.status(500).json({"message" : err.message, "error" : "Yes"})
  	} 
		var sqlstmt = "DELETE FROM USERS WHERE USERID = ?" ;
		db.run(sqlstmt, [ req.params.Id ] , function(err, row){
		    if (err){
		        res.status(500).json({"message" : err.message, "error" : "Yes"});
		    } else {
		        res.status(202).json({"message" : "user : '" + req.params.Id + "' deleted successfully !" , "error" : "No"});
		    }
		    res.end();
		});
	});
    db.close();
});



//=======================================================================
// change the company of the current user 
//=======================================================================

router.get('/changeCompany', function(req, res, next){
    res.render('changecompany');
});




router.post('/updateCurrentCo', function(req, res){	
	var userid = req.user.USERID;
	var defaultCoName = req.body[0].COMPANY;
	var defaultCoID = req.body[0].CO_CODE;

	//if user does not exists
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
		if (err) {
			res.status(500).json({"message" : err.message, "error" : "Yes"});
	  	} else {
			var sqlstmt = "UPDATE USERS SET DEFAULT_CO = ? WHERE USERID = ?" ;
			db.run(sqlstmt, [defaultCoID , userid], function(err, row){
			  	if (err){
			        res.status(202).json({"message" : err.message, "error" : "Yes"});
			    } else {
			        res.status(202).json({"message" : 'User updated successfully!', "error" : "No"});
			    }
			    res.end();
			    db.close();
			});
		}
	});
});




//=======================================================================
// change the Year of the current user 
//=======================================================================

router.get('/changeYear', function(req, res, next){
    res.render('changeyear');
});

router.post('/updateCurrentYr', function(req, res){	
	var userid = req.user.USERID;
	var defaultYr = req.body[0];

	//if user does not exists
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
		if (err) {
			res.status(202).json({"message" : err.message, "error" : "Yes"});
	  	} else {
			var sqlstmt = "UPDATE USERS SET DEFAULT_YEAR = ? WHERE USERID = ?" ;
			db.run(sqlstmt, [defaultYr , userid], function(err, row){
			  	if (err){
			        res.status(202).json({"message" : err.message, "error" : "Yes"});
			    } else {
			        res.status(202).json({"message" : 'User updated successfully!', "error" : "No"});
			    }
			    res.end();
			    db.close();
			});
		}
	});
});


//=======================================================================
// change the Menu for the current user 
//=======================================================================

router.get('/changeMenu', function(req, res, next){
    res.render('changeMenu');
});


router.post('/updateCurrentMenu', function(req, res){	
	var userid = req.user.USERID;
	var defaultMenu = req.body[0];

	//if user does not exists
	let db = new sqlite3.Database( config.database, sqlite3.OPEN_READWRITE, function(err)  {
		if (err) {
			res.status(202).json({"message" : err.message, "error" : "Yes"});
	  	} else {
			var sqlstmt = "UPDATE USERS SET CURRENT_MENU = ? WHERE USERID = ?" ;
			db.run(sqlstmt, [defaultMenu , userid], function(err, row){
			  	if (err){
			        res.status(202).json({"message" : err.message, "error" : "Yes"});
			    } else {
			        res.status(202).json({"message" : 'User updated successfully!', "error" : "No"});
			    }
			    res.end();
			    db.close();
			});
		}
	});
});


module.exports = router;
