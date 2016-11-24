/**
 * SubproductController
 *
 * @description :: Server-side logic for managing subproducts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req,res){

		Product.find({
			id: req.param('productid')
		}).exec( function(err,product){
			console.log(req.param('productid'))
			console.log(product)
			if(err){
				res.json(err)
			}

			Subproduct.create({
				name: req.param('name'),
				desc: req.param('desc'),
				product: req.param('productid')
			}).exec( function(err,subproduct){
				if(err){
					res.json(err)
				}

				res.json({title: "Success", message: "sub product "+req.param('name')+" successfully created!"})
			})
		})
	},

	edit: function(req,res){
		Subproduct.update({
			id: req.param('id')
		},{
			name: req.param('name'),
			desc: req.param('desc')
		}).exec(function(err,updated){
			if(err){
				return res.json(err)
			}

			res.json({message: 'Subproduct updated'})
		})
	},

	getAllSubProduct: function(req,res){
		Product.find({})
		.exec( function(err,productList){
			if(err){
				res.json(err)
			}

			Subproduct.find({})
			.exec(function(err,subproductList){
				if(err){
					res.json(err)
				}

				res.json({
					product : productList,
					subproduct: subproductList
				});
			})
		})
	},

	getSubProduct: function(req,res){
		Product.findOne({
			id: req.param('id')
		}).exec(function(err,product){
			if(err){
				res.json(err)
			}
			console.log(product);
			Subproduct.find({
				product: req.param('id')
			}).exec(function(err,subproduct){
				if(err){
					res.json(err)
				}

				res.json({
					product: product,
					subproduct: subproduct
				})
			})
		})
		// Product.find({
		// 	id: req.param('id')
		// })
		// .populate('subproduct')
		// .exec(function(err,subproduct){
		// 	if(err){
		// 		res.json(err)
		// 	}

		// 	res.json(subproduct);
		// })
	},

	getCertainProduct: function(req,res){
		Subproduct.find({
			product: req.param('id')
		}).exec(function(err,subproduct){
			if(err){
				res.json(err)
			}

			res.json({
				subproduct: subproduct
			})
		})
	},

	delete: function(req,res){

		
		console.log(req.param('name'))
		Product.find({
			name: req.param('name')
		}, function(err,product){
			if(err){
				 return res.json(err)
			}
			console.log(product)
			Product.destroy({
				name: product.name
			}).exec(function (err){
				if(err){
					return res.json(err)
				}

				res.json({message: "Success"})
			})
		})
	},
};

