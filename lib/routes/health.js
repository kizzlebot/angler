'use strict';

const Joi = require('joi');

module.exports = (server) => {

    server.route([
        {
            method: 'GET',
            path: '/health',
            config: {
                description: 'Health check.',
                notes: 'Used for user health check.',
                tags: ['api'],
                pre: [
                    server.pre.health.info
                ],
                handler: {
                    health: {
                        method: 'ping'
                    }
                }
            }
        }
    ]);
};
