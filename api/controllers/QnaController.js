/**
 * QnaController
 *
 * @description :: Server-side logic for managing qnas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getSubjectDetails: function(req,res){
		
		var async = require("async");
		var answers;
		var questions;
		var subjects;

		var data = {};
		
		Subject.find({
			subproduct: req.param('subproductid')
		})
		.exec(function(err,subjectList){
			if(err){
				res.json(err)
			}


			async.eachSeries(subjectList,function(subject,callback){

				console.log(subject);

				Question.find({
					subject: subject.id
				})
				.exec(function(err,questionList){
					if(err){
						console.log('this is pushed')
						res.json(err)
					}

					async.each(questionList,function(question,callback){
						Answer.find({
							question: question.id
						})
						.exec(function(err,answer){
							if(err){
								res.json(err)
							}

							question.answer = answer;

						})

						subject.question = question;

						callback();
					})
				})

				data.subject.push(subject);

				callback();
			})

			res.json(data)
		})
	}
};

