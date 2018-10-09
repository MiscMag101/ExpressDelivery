const buildApp = require('../../app');
const request = require('supertest');
const passport = require('passport');
const mockStrategy = require('passport-mock-strategy');

describe('Application with express.js', () => {
    it('respond with json containing a list of all users', function (done) {
        passport.use(mockStrategy);
        const app = buildApp('mock', passport);
        request(app)
            .get('/users')
            .expect(200, done);
    });
    it('respond with json containing a list of all users', function (done) {
        passport.use(mockStrategy);
        const app = buildApp('mock', passport);
        request(app)
            .get('/signin/failed/')
            .expect(200, done);
    });
});