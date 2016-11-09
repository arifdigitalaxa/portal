/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req,res){

		Subject.find({
			id: req.param('subjectid')
		}).exec( function(err,subject){
			if(err){
				res.json(err)
			}

			Question.create({
				name: req.param('name'),
				desc: req.param('desc'),
				subject: req.param('subjectid')
			}).exec( function(err,question){
				if(err){
					res.json(err)
				}

				res.json({title: "Success", message: "Question "+req.param('name')+" successfully created!"})
			})
		})
	},

	getAllQuestion: function(req,res){
		Subject.find({})
		.exec( function(err,subjectList){
			if(err){
				res.json(err)
			}

			Question.find({})
			.exec(function(err,questionList){
				if(err){
					res.json(err)
				}

				res.json({
					subject: subjectList,
					question: questionList
				});
			})
		})
	},

	getQuestion: function(req,res){
		Subject.findOne({
			id: req.param('id')
		}).exec(function(err,subject){
			if(err){
				res.json(err)
			}

			Question.find({
				subject: req.param('id')
			}).exec(function(err,question){
				if(err){
					res.json(err)
				}

				res.json({
					subject: subject,
					question: question
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


