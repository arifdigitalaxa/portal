/**
 * Files.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name: {
	   type: 'string'
	},
	desc: {
		type: 'string'
	},
	type: {
		type: 'string'
	},
	size: {
		type: 'string'
	},
	fd: {
		type: 'string'
	},
	url:{
		type: 'string'
	},
	tags: {
		type: 'string'
	},
	
  	subproduct: {
    	model: 'subproduct'
    },
  }
};

