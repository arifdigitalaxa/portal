/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getAllDataDetail: function(req,res){
		var async = require("async");

		Subproduct.findOne({
			id: req.param('id')
		})
		.exec(function(err,subprod){
			if(err){
				res.json(err)
			}

			Product.findOne({
				id: subprod.product
			})
			.exec(function(err,prod){
				if(err){
					res.json(err)
				}

				Subject.find({
					subproduct: subprod.id
				})
				.exec(function(err,sub){
					if(err){
						res.json(err)
					}

					Question.find({
						subject: sub.id
					})
					.exec(function(err,quest){
						if(err){
							res.json(err)
						}

						Answer.find({
							question: quest.id
						})
						.exec(function(err,ans){
							if(err){
								res.json(err)
							}

							res.json({
								product: prod,
								subproduct: subprod,
								subject: sub,
								question: quest,
								answer: ans 
							})
						})
					})
				})
				
			})
		})
	}
	
};