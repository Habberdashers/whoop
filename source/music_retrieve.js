var _ = require("underscore");
var jsonfile = require("jsonfile");
var path = require('path');


module.exports = function(user) {
	// Grab a username from the file and deliver the music information..  

var filePath = path.join(__dirname, 'files/music.json');
	jsonfile.readFile(filePath, function(error, data){
		if (error){
			console.log(error);
			return; 
		}
		console.log(data[user]);
	});
}