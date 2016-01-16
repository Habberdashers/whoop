var jsonfile = require("jsonfile");
var path = require('path');

module.exports = function(test) {
	// Grab a username and save it. Check the current file for the username
	console.log('Evening peeps, it is time for music!');
	var filePath = path.join(__dirname, 'Files/music.json');

	jsonfile.readFile(filePath, function(error, data){
		if (error){
			console.log(error);
			return;
		}
		console.log(data);
		var user = test.userName;
		var music = test.music;
		console.log(user);
		console.log(music);
		data[user] = music ;

		jsonfile.writeFile(filePath, data, function(error){
			if (error){
				console.log(error);
				return;
			}
			console.log("check passed: Writing");
		});
	});

	console.log(test.userName);
};
