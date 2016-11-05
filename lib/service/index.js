'use strict';

const nodePackage = require('../../package');
const internals = module.exports = {};

internals.register = function (server, options, next) {

    server.log(['service:plugin', nodePackage.name], 'successfully registered.');

    if (options.enableNewRelic) {
        const newRelic = require('newrelic');

        server.expose('newRelic', newRelic);
        server.decorate('request', 'newRelic', newRelic);
        server.decorate('server', 'newRelic', newRelic);
    }

    return next();
};

internals.register.attributes = {
    pkg: nodePackage
};
