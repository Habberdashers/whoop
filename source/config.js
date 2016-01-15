'use strict';

var path = require('path');

var appName = 'whoop';

module.exports = {
    appName: appName,
    port: process.env.COLUMBIAN_BEANS_PORT || 1095,
    logFilePath: path.join(__dirname, 'files', appName + '.log'),
    mongoPath: process.env.MONGO_DATA_PATH || 'mongodb://localhost:27017/'
};
