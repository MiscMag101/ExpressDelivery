const express = require('express');

function greetings(req, res) {
    const VALID_NAME_PATTERN = /^([a-z]+)+$/;

    if (!VALID_NAME_PATTERN.test(req.user.username)) {
        res.redirect('signin/failed');
        return;
    }
    if (req.isAuthenticated()) {
        res.send('Hello ' + req.user.username + '!');
    } else {
        res.redirect('signin/failed');
    }
}

function routerGithub(strategy, myPassport) {
    const router = express.Router();

    // Route if authentication failed
    router.get('/failed', function (req, res) {
        res.send('Authentication failed! You are not authenticated!');
    });


    // Route to start OAuth2 authentication flow with Github

    router.get('/github', myPassport.authenticate(strategy));

    // Route for callback from GitHub
    router.get('/github/callback',
        // Get user profile with authorization code and access token
        myPassport.authenticate(strategy, {session: false}),
        greetings
    );
    return router;
}

module.exports = {
    greetings: greetings,
    routerGithub: routerGithub
};