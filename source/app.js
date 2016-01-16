'use strict';


var express = require('express');
var bodyParser = require('body-parser');
var logger = require('gruew-logger');
var config = require('./config');
var hello = require('./hello-world');
var music_task = require('./music-task');
var music_retrieve = require('./music_retrieve');
var playlist = require('./playlist');


function App() {
    this.run = function () {
        if(process.argv.length > 2 && process.argv[2] === 'utest'){
            var user1 = {
                "firstName": "Andre",
                "lastName": "Green",
                "isAlpha": true,
                "email":"andre@cern.ch",
                "fbLink": "http://www.facebook.com/andre",
                "fbId": "1",
                "img": "http://www.facebook.com/andre.jpg",
                "coordinate":{
                    "Lat":"37.640090",
                    "long":"-121.000346"
                }
            };
            var user2 = {
                "firstName": "Sergio",
                "lastName": "Gonzalez",
                "isAlpha": false,
                "email":"sergio@learnbeat.org",
                "fbLink": "http://www.facebook.com/sergio",
                "fbId": "2",
                "img": "http://www.facebook.com/sergio.jpg",
                "coordinate":{
                    "Lat":"37.640091",
                    "long":"-121.000344"
                }
            }
        }else if (process.argv.length > 2 && process.argv[2] === 'hello') {
            hello();
        } else if (process.argv.length > 2 && process.argv[2] === 'music') {
            var test = {
                "userName":"andre@something.com",
                "music": {
                    "Childish Gambino":[
                        "song1",
                        "song2",
                        "song3"
                    ],
                    "Taylor Swift":[
                        "song1",
                        "song2",
                        "song3"
                    ]
                }
            };
            music_task(test);
            //some function that takes test and saves it to file/music.json
        }

        else if (process.argv.length > 2 && process.argv[2] === 'retrieve'){
            var user= "andre@something.com";
            music_retrieve(user);
        }
        else if (process.argv.length > 2 && process.argv[2] === 'current'){
            var user1 = {
                "firstName": "Andre",
                "lastName": "Green",
                "isAlpha": true,
                "email":"andre@cern.ch",
                "fbLink": "http://www.facebook.com/andre",
                "fbId": "1",
                "img": "http://www.facebook.com/andre.jpg",
                "coordinate":{
                    "Lat":"37.640090",
                    "long":"-121.000346"
                }
            };
            current_list(user1);
        } else if (process.argv.length > 2 && process.argv[2] === 'playlist'){
            var user= "andre@something.com";
            playlist(user, function (error, playlist) {
                if (error) {
                    logger.log(['Getting user playlist', error], __filename, true);
                    return;
                }

                logger.log(['Got the playlist!', playlist], __filename, false);
            });
        } else {
            var requestHandler = require('./request-handler');
            var app = express();
            app.use(bodyParser.json());

            app.post('/save-user', requestHandler.saveUser.bind(requestHandler));

            app.get('/get-alpha', requestHandler.getAlpha.bind(requestHandler));
            app.get('/get-all-users', requestHandler.getAllUsers.bind(requestHandler));

            var port = config.port;
            var server = app.listen(port, function () {
                logger.log(
                    [config.appName, 'server running on port:', port],
                    __filename,
                    false
                );
            });
        }
    }
}

module.exports = App;
