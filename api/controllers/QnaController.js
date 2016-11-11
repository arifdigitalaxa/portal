/**
 * QnaController
 *
 * @description :: Server-side logic for managing qnas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getQuestionAnswer: function(req,res){
		
		var async = require("async");
		var answers;
		var questions;
		var subjects;

		console.log(req.param('id'))

		Question.find({
				subject: req.param('id')
			})
			.exec(function(err,questionList){

				var data = [];

				if(err){
					return res.json(err)
				}
				async.each(questionList, function(question,callback){
					//console.log(question)

					Answer.find({
						question: question.id
					})
					.exec(function(err,answer){
						if(err){
							return res.json(err)
						}
						question['answer'] = answer
						//console.log(question);
						data.push(question)

						callback();

					})
				}, function(err){
					console.log(data)
					res.json({
						question: data
					})
				})				
			})
		// Subject.findOne({
		// 	id: req.param('id')
		// })
		// .exec(function (err,subjectData){
			
		// 	if(err){
		// 		return res.json(err)
		// 	}

			

		// 	Question.find({
		// 		subject: subjectData.id
		// 	})
		// 	.exec(function(err,questionList){

		// 		var data = [];

		// 		if(err){
		// 			return res.json(err)
		// 		}
		// 		async.each(questionList, function(question,callback){
		// 			//console.log(question)

		// 			Answer.find({
		// 				question: question.id
		// 			})
		// 			.exec(function(err,answer){
		// 				if(err){
		// 					return res.json(err)
		// 				}
		// 				question['answer'] = answer
		// 				//console.log(question);
		// 				data.push(question)

		// 				callback();

		// 			})
		// 		}, function(err){
		// 			console.log(data)
		// 			res.json({
		// 				subject: subjectData,
		// 				question: data
		// 			})
		// 		})				
		// 	})
		// })
	},

	getCertainQuestion: function(req,res){
		var async = require("async");
		var answers;
		var questions;
		var subjects;

		console.log(req.param('id'))
		console.log(req.param('keyword'))
		

		Question.find({
				subject: req.param('id'),
				name: {'like' : req.param('keyword')}
			})
			.exec(function(err,questionList){

				var data = [];

				if(err){
					return res.json(err)
				}
				async.each(questionList, function(question,callback){
					//console.log(question)

					Answer.find({
						question: question.id
					})
					.exec(function(err,answer){
						if(err){
							return res.json(err)
						}
						question['answer'] = answer
						//console.log(question);
						data.push(question)

						callback();

					})
				}, function(err){
					console.log(data)
					res.json({
						question: data
					})
				})				
			})
	},

	getSubProductSubjects: function(req,res){
		Subproduct.findOne({
			id: req.param('id')
		}).exec(function(err,subproduct){
			if(err){
				res.json(err)
			}

			Subject.find({
				subproduct: subproduct.id
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
};

