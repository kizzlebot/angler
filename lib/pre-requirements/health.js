'use strict';

module.exports.info = (request, reply) => {

    const blipp = request.server.plugins.blipp.info();

    return reply(blipp);
};
