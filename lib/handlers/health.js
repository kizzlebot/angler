'use strict';

const internals = module.exports = (route, options) => {

    return (request, reply) => {

        return internals[options.method](request, reply);
    };
};

internals.ping = (request, reply) => {

    const healthService = request.server.methods.health;

    return reply(healthService.serviceStatus(request.pre.info));
};
