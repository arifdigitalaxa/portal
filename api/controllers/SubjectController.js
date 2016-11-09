/**
 * SubjectController
 *
 * @description :: Server-side logic for managing subjects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req,res){

		Subproduct.find({
			id: req.param('subproductid')
		}).exec( function(err,subproduct){
			if(err){
				res.json(err)
			}

			Subject.create({
				name: req.param('name'),
				desc: req.param('desc'),
				subproduct: req.param('subproductid')
			}).exec( function(err,subject){
				if(err){
					res.json(err)
				}

				res.json({title: "Success", message: "Subject "+req.param('name')+" successfully created!"})
			})
		})
	},

	getAllSubject: function(req,res){
		Subproduct.find({})
		.exec( function(err,subproductList){
			if(err){
				res.json(err)
			}

			Subject.find({})
			.exec(function(err,subjectList){
				if(err){
					res.json(err)
				}

				res.json({
					subproduct: subproductList,
					subject: subjectList
				});
			})
		})
	},

	getSubject: function(req,res){
		Subproduct.findOne({
			id: req.param('id')
		}).exec(function(err,subproduct){
			if(err){
				res.json(err)
			}

			Subject.find({
				subproduct: req.param('id')
			}).exec(function(err,subject){
				if(err){
					res.json(err)
				}

				res.json({
					subproduct: subproduct,
					subject: subject
				})
			})
		})
	},


	delete: function(req,res){

		
		console.log(req.param('name'))
		Subject.find({
			name: req.param('name')
		}, function(err,subject){
			if(err){
				 return res.json(err)
			}
			Subject.destroy({
				name: subject.name
			}).exec(function (err){
				if(err){
					return res.json(err)
				}

				res.json({message: "Success"})
			})
		})
	},
};


