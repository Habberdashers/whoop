// We need to keep a ranking on music ,
var _ = require("underscore");
var jsonfile = require("jsonfile");
var path = require('path');
var playlist = [];
var user_service = require('./uservice');

module.exports = function(email) {
	// Grab a username and if they are alpha, begin to build playlist with ranking system
var songs; 
var filePath = path.join(__dirname, 'files/music.json');
	jsonfile.readFile(filePath, function(error, data){
		if (error){
			console.log(error);
			return; 
		}
		if (true){ //IsAlpha check right here
			songs = data[email];
			console.log(songs);
			}
			for (artists in songs){
				for (song in songs[artists]){
					
					playlist.push(songs[artists][song],[])
					
				}
			}
			console.log(playlist);	
	});
}

