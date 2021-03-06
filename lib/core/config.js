'use strict';

const Confidence = require('confidence');

const criteria = {
    env: process.env.NODE_ENV
};

const config = {
    $meta: 'This file configures the plot device.',
    projectName: require('../../package').name,
    host: {
        api: {
            $filter: 'env',
            production: '0.0.0.0',
            $default: '0.0.0.0'
        }
    },
    port: {
        api: {
            $filter: 'env',
            test: 1337,
            $default: 1337
        }
    },
    newrelic: {
        enabled: {
            $filter: 'env',
            $default: false,
            production: true
        }
    },
    good: {
        reporters: {
            $filter: 'env',
            $default: {
                console: [
                    {
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{ log: '*', response: '*' }]
                    },
                    {
                        module: 'good-console'
                    },
                    'stdout'
                ]
            },
            production: {
                file: [
                    {
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{ ops: '*' }]
                    },
                    {
                        module: 'good-squeeze',
                        name: 'SafeJson'
                    },
                    {
                        module: 'good-file',
                        args: [process.cwd() + '/logs/log.json']
                    }
                ]
            }
        }
    }
};

const store = new Confidence.Store(config);

exports.get = function (key) {

    return store.get(key, criteria);
};

exports.meta = function (key) {

    return store.meta(key, criteria);
};
