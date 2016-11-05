'use strict';

const Confidence = require('confidence');
const Config = require('./config');

const criteria = {
    env: process.env.NODE_ENV
};

const manifest = {
    $meta: 'This file defines the plot device.',
    server: {
        debug: {
            request: ['error']
        },
        connections: {
            routes: {
                security: true
            }
        }
    },
    connections: [{
        host: Config.get('/host/api'),
        port: Config.get('/port/api'),
        labels: ['api']
    }],
    registrations: [
        {
            plugin: 'blipp'
        },
        {
            plugin: 'inert'
        },
        {
            plugin: 'vision'
        },
        {
            plugin: 'hapi-swagger'
        },
        {
            plugin: {
                register: 'good',
                options: {
                    ops: {
                        interval: 5000
                    },
                    reporters: Config.get('/good/reporters')
                }
            }
        },
        {
            plugin: {
                register: '@flexshopper/hapi-pres',
                options: {
                    relativeTo: `${process.cwd()}/lib/pre-requirements`,
                    includes: ['**/*.js']
                }
            }
        },
        {
            plugin: {
                register: '@flexshopper/hapi-handlers',
                options: {
                    relativeTo: `${process.cwd()}/lib/handlers`,
                    includes: ['**/*.js']
                }
            }
        },
        {
            plugin: {
                register: '@flexshopper/hapi-methods',
                options: {
                    relativeTo: `${process.cwd()}/lib/methods`,
                    includes: ['**/*.js']
                }
            }
        },
        {
            plugin: {
                register: '@flexshopper/hapi-routes',
                options: {
                    relativeTo: `${process.cwd()}/lib/routes`,
                    includes: ['**/*.js']
                }
            }
        },
        {
            plugin: {
                register: process.cwd() + '/lib/service',
                options: {
                    enableNewRelic: process.env.NEW_RELIC_ENABLED
                }
            }
        }
    ]
};

const store = new Confidence.Store(manifest);

exports.get = function (key) {

    return store.get(key, criteria);
};

exports.meta = function (key) {

    return store.meta(key, criteria);
};
