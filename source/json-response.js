'use strict';

module.exports = function (error, payload, response) {
    response.send(JSON.stringify({
        error: error,
        payload: payload
    }));
};
