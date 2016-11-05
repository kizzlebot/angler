'use strict';

const internals = module.exports = {};

internals.serviceStatus = {
    method: (data) => {

        return {
            running: true,
            blipp: data
        };
    }
};
