/**
 * LogsController
 *
 * @description :: Server-side logic for managing logs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	addLogs : function(req,res){
		Logs.create({
			user: req.session.me.id,
			action: req.param.action,
			model: req.param.model,
			dataId: req.param.dataId
		}).exec(function(err,log){
			if(err){
				res.json(err)
			}

			res.json({
				message: "success"
			})
		})
	},

	getLogs : function(req,res){
		Logs.find({

		}).exec(function(err,logs){
			if(err){
				res.json(err)
			}

			res.json({
				data : logs
			})
		})
	},

	getLogsbyUser : function(req,res){
		Logs.find({

		}).exec(function(err,logs){
			if(err){
				res.json(err)
			}

			res.json({
				data : logs
			})
		})
	}
	
};

