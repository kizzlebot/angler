'use strict';

const Hapi = require('hapi');
const nodePackage = require('../package');
const run = require('../lib/core');
const manifest = require('../lib/core/manifest');
const Config = require('../lib/core/config');
const service = require('../lib/service');

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe(nodePackage.name + ' core application.', () => {

    it('it composes a server.', (done) => {

        run((err, composedServer) => {

            expect(composedServer).to.be.an.object();

            return done(err);
        });
    });

    it('it gets manifest data.', (done) => {

        expect(manifest.get('/')).to.be.an.object();

        return done();
    });

    it('it gets manifest meta data.', (done) => {

        expect(manifest.meta('/')).to.match(/this file defines the plot device/i);

        return done();
    });

    it('it gets config data.', (done) => {

        expect(Config.get('/')).to.be.an.object();

        return done();
    });

    it('it gets config meta data.', (done) => {

        expect(Config.meta('/')).to.match(/this file configures the plot device/i);

        return done();
    });
});

describe(nodePackage.name + ' main service application.', () => {

    let server;

    beforeEach((done) => {

        const services = [service];
        server = new Hapi.Server();
        server.connection({ port: Config.get('/port/api') });
        server.register(services, (err) => {

            if (err) {
                return done(err);
            }

            return done();
        });
    });

    it('it returns the default message.', (done) => {

        server.inject({
            method: 'GET',
            url: '/documentation'
        }, (res) => {

            expect(res.result.statusCode).to.equal(404);

            return done();
        });
    });
});

describe(`${nodePackage.name} testing newRelic.`, () => {

    let server;

    beforeEach((done) => {

        const services = [{
            register: service,
            options: {
                enableNewRelic: true
            }
        }];

        server = new Hapi.Server();
        server.connection({ port: Config.get('/port/api') });
        server.register(services, (err) => {

            if (err) {
                return done(err);
            }

            return done();
        });
    });

    it('it returns the default message.', (done) => {

        expect(server.plugins[nodePackage.name].newRelic).to.exist();
        return done();
    });
});

describe(`${nodePackage.name} testing health.`, () => {

    let server;

    beforeEach((done) => {

        run((err, composedServer) => {

            server = composedServer;

            return done(err);
        });
    });

    it('should return 200 OK', (done) => {

        server.inject('/health', (res) => {

            expect(res.statusCode).to.be.equal(200);
            return done();
        });
    });
});
