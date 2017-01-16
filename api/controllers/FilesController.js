/**
 * FilesController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	deleteFile: function(req,res){
		var fs = require("fs")
		Files.findOne({
			id: req.param('id')
		}).exec(function(err,file){
			fs.unlink(file.fd, function(err) {
			   if (err) {
			      return res.json(err);
			   }

	   			console.log("File deleted successfully!");
	   			res.json({message: 'success'})
			})
		})
	},

	showFile: function(req,res){
		
		var SkipperDisk = require('skipper-disk');
    	var fileAdapter = SkipperDisk(/* optional opts */);

    	Files.findOne({
    		id: req.body['id']
    	})
    	.exec(function(err, file){
    		// res.attachment(file.fd)
    		fileAdapter.read(file.fd)
    		.on('error', function (err){
      			return res.serverError(err);
    		})
    		.pipe(res);
    	})
	}
	
};

