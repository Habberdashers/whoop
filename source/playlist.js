'use strict';


// We need to keep a ranking on music ,
var _ = require("underscore");
var jsonfile = require("jsonfile");
var path = require('path');
var playlist = [];
var uservice = require('./uservice');
var logger = require('gruew-logger');


module.exports = {
    getPlayList: function(callback) {
        // Grab a username and if they are alpha, begin to build playlist with ranking system
        var songs;

        this.musicFilePath = path.join(__dirname, 'files/music.json');

        jsonfile.readFile(this.musicFilePath, function(error, data){
            if (error){
                logger.log(['Reading file', filePath, error], __filename, true);
                callback(error, null);
                return;
            }

            var alphaUser = uservice.getAlphaSync();
            if (alphaUser) {
                var alphaList =
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
    },

    savePlayList: function(playlist, callback) {
        var alpha = uservice.getAlphaSync();
        if (alpha) {
            callback(true);
            return;
        }

        var user = uservice.getUser(playlist.email);
        if (user) {
            user.isAlpha = true;
            uservice.addUser(user, function(error) {
                if (error) {
                    logger.log(['failed to save user', error], __filename, true);
                    callback(error);
                    return;
                }

                this.parseNewPlayList(playlist);
                callback(null);
            });
        }
    },

    parseNewPlayList: function(playlist) {
        var modifiedList = {};
        _.each(playlist.music, function (song) {
            modifiedList[song] = [];
        });

        jsonfile.writeFile(this.musicFilePath, modifiedList, function(error) {
            if (error) {
                logger.log(['Could not write to music file', file, error], __filename, true);
                return;
            }

            logger.log(['Saved', playlist.email, 'to', this.musicFilePath], __filename, false);
        }.bind(this));
    }
};
