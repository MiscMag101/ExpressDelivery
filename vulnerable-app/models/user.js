var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    GitHubId: {
        type: String,
        unique: true,
        required: true
    }
});

UserSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
    var userObj = new this();
    this.findOne({GitHubId: profile.id}, function (err, result) {
        if (!result) {
            // Create a new user if this user is not in the databse
            userObj.username = profile.username;
            userObj.GitHubId = profile.id;
            //....
            userObj.save(cb);
        } else {
            // Return the user
            cb(err, result);
        }
    });
};

module.exports = mongoose.model('User', UserSchema); 
