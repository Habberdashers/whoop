'use strict';


var express = require('express');
var bodyParser = require('body-parser');
var logger = require('gruew-logger');
var config = require('./config');


function App() {
    this.run = function () {
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

module.exports = App;
