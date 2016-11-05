'use strict';

const run = require('./core');

run((err, server) => {

    if (err) {
        throw err;
    }

    server.start(() => {

        const connection = server.select(['api']);
        const serviceInfo = require('../package');

        server.log(['info', serviceInfo.name], `started at: ${connection.info.uri}`);
    });
});
