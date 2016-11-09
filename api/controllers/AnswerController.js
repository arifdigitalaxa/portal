/**
 * AnswerController
 *
 * @description :: Server-side logic for managing answers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req,res){

		Question.find({
			id: req.param('questionid')
		}).exec( function(err,question){
			if(err){
				res.json(err)
			}

			Answer.create({
				name: req.param('name'),
				desc: req.param('desc'),
				subject: req.param('questionid')
			}).exec( function(err,answer){
				if(err){
					res.json(err)
				}

				res.json({title: "Success", message: "Answer "+req.param('name')+" successfully created!"})
			})
		})
	},

	getAllAnswer: function(req,res){
		Question.find({})
		.exec( function(err,questionList){
			if(err){
				res.json(err)
			}

			Answer.find({})
			.exec(function(err,answerList){
				if(err){
					res.json(err)
				}

				res.json({
					question: questionList,
					answer: answerList
				});
			})
		})
	},

	getAnswer: function(req,res){
		Question.findOne({
			id: req.param('id')
		}).exec(function(err,question){
			if(err){
				res.json(err)
			}

			Answer.find({
				subject: req.param('id')
			}).exec(function(err,answer){
				if(err){
					res.json(err)
				}

				res.json({
					question: question,
					answer: answer
				})
			})
		})
	},


	delete: function(req,res){

		
		console.log(req.param('name'))
		Question.find({
			name: req.param('name')
		}, function(err,question){
			if(err){
				 return res.json(err)
			}
			Answer.destroy({
				name: question.name
			}).exec(function (err){
				if(err){
					return res.json(err)
				}

				res.json({message: "Success"})
			})
		})
	},
};


