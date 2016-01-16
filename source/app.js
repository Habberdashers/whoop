'use strict';


var express = require('express');
var bodyParser = require('body-parser');
var logger = require('gruew-logger');
var config = require('./config');
var hello = require('./hello-world');
var music_task = require('./music-task');

function App() {
    this.run = function () {
        if (process.argv.length > 2 && process.argv[2] === 'hello') {
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
        } else {
            var app = express();
            app.use(bodyParser.json());

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
