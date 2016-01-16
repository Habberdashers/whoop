// We need to keep a ranking on music ,
var _ = require("underscore");
var jsonfile = require("jsonfile");
var path = require('path');

module.exports = function(user_current) {
	var filePath = path.join(__dirname, 'Files/music.json');

	jsonfile.readFile(filePath, function(error, user_current){
		if (error){
			console.log();
			return; 
		}
		console.log(user_current[0]);
		

		jsonfile.writeFile(filePath, user_current, function(error){
			if (error){
				console.log(error);
				return;
			}
			console.log("Check passed: Rating");
	});
});



};
