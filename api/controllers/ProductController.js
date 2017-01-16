/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	create: function(req,res){

		Product.find({
			name: req.param('name')
		}, function(err,productData){

			if(productData === null){
				return res.json({title: "Error", message: "product "+req.param('name')+" already created!"})

				//res.json({title: "Error", message: "product already created!"})
				// console.log("2");

			}
			Product.create({
					name: req.param('name'),
					desc: req.param('desc')
				}, function(err,newproduct){
				if(err){
					res.json(err)
				}
					res.json({title: "Success", message: "product "+req.param('name')+" successfully created!"})
				})	
		})
	},

	getAllProduct: function(req,res){

		var async = require("async");

		var productList = [];

		Product.find({}, function(err,prodList){
			if(err){
				res.json(err)
			}

			async.each(prodList,function(product,callback){

				Subproduct.find({
					product: product.id
				})
				.exec(function(err, subproduct){
					product["subproduct"] = subproduct;

					productList.push(product)

					callback()
				})
			},function(err){
				res.json(productList);
			})
		})
	},

	delete: function(req,res){

		
		Product.find({
			name: req.param('name')
		}, function(err,product){
			if(err){
				 return res.json(err)
			}
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

