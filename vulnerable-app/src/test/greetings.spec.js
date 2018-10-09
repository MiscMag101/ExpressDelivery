const greetings = require('../../routes/signin').greetings;

describe('function greetings', () => {
    it('should reject invalid login (XSS)', () => {
        let res = {redirect: jest.fn()};
        greetings({user: {username: '<script>alert()</script>'}}, res);
        expect(res.redirect.mock.calls[0][0]).toBe('signin/failed');
    });
});



