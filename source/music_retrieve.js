var _ = require("underscore");
var jsonfile = require("jsonfile");
var path = require('path');


module.exports = function(user) {
	// Grab a username from the file and deliver the music information..  


console.log("We are retrieving today!");


var filePath = path.join(__dirname, 'Files/music.json');
	jsonfile.readFile(filePath, function(error, data){
		if (error){
			console.log(error);
			return; 
		}
		else if (_.find(data, user) === undefined){
			return
		}
		console.log(_.find(data, user));
	});
}