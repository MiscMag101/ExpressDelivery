// Import Passport middleware
const MyPassport = require('passport');

// Import GitHub Strategy for Passport
const MyGitHubStrategy = require('passport-github').Strategy;

// Configure the new GitHub Strategy for Passport
MyPassport.use(new MyGitHubStrategy(
    //Settings for GitHub Strategy
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://' + process.env.HOST + ':' + process.env.PORT + '/signin/github/callback',
        scope: 'read:user'
    },

    // Verification function
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

// Export passport object
module.exports = MyPassport;
