/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getAllDataDetail: function(req,res){
		var async = require("async");

		console.log(req.param('id'))

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
				if(err){s
					res.json(err)
				}

				Subject.find({
					subproduct: subprod.id
				})
				.exec(function(err,subList){
					if(err){
						res.json(err)
					}

					var arrQuest = [];
					var arrAns = [];

					async.each(subList,function(subject,callback){

						Question.find({
							subject: subject.id
						})
						.exec(function(err,questionList){

							if(err){
								res.json(err)
							}

							if(questionList.length != 0){
								async.each(questionList,function(question,call){
									arrQuest.push(question);

									call();	

								},function(err){

								})
							}
							callback();
						})
					},function(err){
						
						async.each(arrQuest,function(question,cb){
							Answer.find({
								question: question.id
							})
							.exec(function(err,answerList){
								
								async.each(answerList,function(answer,c){
									arrAns.push(answer)

									c();
									
								},function(err){

								})

								cb();
							})
						},function(err){

							res.json({
								product: prod,
								subproduct: subprod,
								subject: subList,
								question: arrQuest,
								answer: arrAns
							})

						})
					})
				})
				
			})
		})
	}
	
};