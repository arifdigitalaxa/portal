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

		Subject.findOne({
			id: req.param('id')
		})
		.exec(function (err,subjectData){
			
			if(err){
				return res.json(err)
			}

			

			Question.find({
				subject: subjectData.id
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
						subject: subjectData,
						question: data
					})
				})				
			})
		})
	}
};

