'use strict';


// We need to keep a ranking on music ,
var _ = require("underscore");
var jsonfile = require("jsonfile");
var path = require('path');
var playlist = [];
var user_service = require('./uservice');

module.exports = function(email, callback) {
    // Grab a username and if they are alpha, begin to build playlist with ranking system
    var songs;
    var filePath = path.join(__dirname, 'files/music.json');
    jsonfile.readFile(filePath, function(error, data){
        if (error){
            logger.log(['Reading file', filePath, error], __filename, true);
            callback(error, null);
            return;
        }

        var keys = _.keys(data);
        var alphaEmail;
        for (var i=0; i < keys.length; i++) {
            var userEmail = data[keys[i]];
            if (userEmail === email) {
                alphaEmail = userEmail;
                break;
            }
        }

        if (alphaEmail){ //IsAlpha check right here
            songs = data[alphaEmail];
            console.log(songs);
            for (var artists in songs){
                for (var song in songs[artists]){
                    playlist.push(songs[artists][song],[])
                }
            }

            console.log(playlist);
            callback(null, playlist);
            return;
        }

        callback(new Error('no alpha in list'));
    });
};

