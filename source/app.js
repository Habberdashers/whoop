'use strict';


var express = require('express');
var bodyParser = require('body-parser');
var logger = require('gruew-logger');
var config = require('./config');
var hello = require('./hello-world');


function App() {
    this.run = function () {

        if (process.argv.length > 2 && process.argv[2] === 'hello') {
            hello();
        } else if (process.argv.length > 2 && process.argv[2] === 'argument') {
            // some other function
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
