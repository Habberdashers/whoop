'use strict';

var uservice = require('./uservice');
var jsonResponse = require('./json-response');
var logger = require('gruew-logger');


module.exports = {
    saveUser: function(req, res) {
        var postData = req.body;
        uservice.addUser(postData, callback(error) {
            if (error) {
                logger.log(['Saving user data', __filename, true]);
                jsonResponse(error, null, res);
                return;
            }

            jsonResponse(null, null, res);
        });
    },

    getAlpha: function (req, res) {
        uservice.getAlpha(callback(error, alpha) {
            if (error) {
                logger.log(['Getting alpha', __filename, true]);
                jsonResponse(error, null, res);
                return;
            }

            jsonResponse(null, alpha, res)
        });
    },

    getAllUsers: function (req, res) {
        var users = uservice.getAllUsers();
        jsonResponse(null, users, res);
    }
};
