var mongoose = require('mongoose');


// postit Schema
var PostitSchema = mongoose.Schema({
	text: {
		type: String
	},
	user: {
		type: String
	},
	x: {
		type: String
	},
	y: {
		type: String
	},
	date: {
		type: String
	}
});

var Postit = module.exports = mongoose.model('Postit', PostitSchema);

module.exports.getPostitById = function(id, callback){
	Postit.findById(id, callback);
}

module.exports.getPostitByUsername = function(user, callback){
	var query = {user: user};
	User.find(query, callback);
}

module.exports.createPostit = function(newPostit, callback){
	newPostit.save(callback);
}

