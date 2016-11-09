/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	showHomePage: function(req,res) {

		if (!req.session.me) {
	      return res.view('login');
	    }

	    Users.findOne(req.session.me, function(err,user){
	    	if (err) {
       			return res.negotiate(err);
      		}

      		if (!user) {
        		sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        		return res.view('login');
      		}
      		
      		return res.view('product');

	    })
	}
};

