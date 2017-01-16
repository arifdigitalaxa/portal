/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	create: function(req,res){

		var Passwords = require('machinepack-passwords');

		Users.find({
			username: req.param('username')
		}, function(err,userData){

			if(userData === null){
				return res.json({title: "Error", message: "User "+req.param('username')+" already created!"})

				//res.json({title: "Error", message: "User already created!"})
				// console.log("2");

			}
			
			Passwords.encryptPassword({
				password: req.param('password')
			}).exec({
				error:function(err){
					return res.json(err.message)
				},
				success:function(pass){
					Users.create({
					username: req.param('username'),
					password: pass,
					email: req.param('email'),
					userType: req.param('userType')
				}, function(err,newUser){
				if(err){
					return res.json(err)
				}
					return res.json({title: "Success", message: "User "+req.param('username')+" successfully created!"})
				})
			},
		})	

		})
	},

	getAllUser: function(req,res){
		Users.find({}, function(err,userList){
			if(err){
				res.json(err)
			}

			res.json(userList);
		})
	},

	login: function(req,res){
		var Passwords = require('machinepack-passwords');

		Users.findOne({
			username: req.param('username')
		}, function(err,userData){
			if(err){
				res.json(err)
			}
			if (typeof userData === "undefined") {
   				 res.json({result: "no username created under "+req.param('username')})
			}else{
					Passwords.checkPassword({
					passwordAttempt: req.param('password'),
	        		encryptedPassword: userData.password
				}).exec({
					error:function(err){
						res.json({result: err.message})
					},
					incorrect:function(){
						res.json({result: 'Password incorrect'})
					},
					success:function(){
						req.session.me = userData;

						res.json({result: 'success'})
					}
				})
			}
			
		})
	},

	logout: function (req, res) {

	    // Look up the user record from the database which is
	    // referenced by the id in the user session (req.session.me)
	    Users.findOne({
	    	username: req.session.me.username
	    }, function foundUser(err, user) {
	      if (err) return res.negotiate(err);
	      // If session refers to a user who no longer exists, still allow logout.
	      if (!user) {
	        sails.log.verbose('Session refers to a user who no longer exists.');
	        return res.showHomePage();
	      }

	      // Wipe out the session (log out)
	      req.session.me = null;

	      // Either send a 200 OK or redirect to the home page
	      return res.showHomePage();

	    });
  	},

	delete: function(req,res){

		
		Users.find({
			username: req.param('username')
		}, function(err,user){
			if(err){
				 return res.json(err)
			}
			Users.destroy({
				username: user.username
			}).exec(function (err){
				if(err){
					return res.json(err)
				}

				res.json({message: "Success"})
			})
		})
	},

	getSession: function(req,res){
		if(req.session.me){
			res.json(req.session.me)
		}else{
			res.json(null);
			console.log("No Session")
		}
	}
};
