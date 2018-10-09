var mongoose = require('mongoose');
var cfenv = require('cfenv');
var Schema = mongoose.Schema;

var Todo = new Schema({
  content: Buffer,
  updated_at: Date,
});

mongoose.model('Todo', Todo);

var User = new Schema({
  username: String,
  password: String,
});

mongoose.model('User', User);

// CloudFoundry env vars
console.log(JSON.stringify(cfenv.getAppEnv()));

// Default Mongo URI is local
var mongoUri = 'mongodb://' + process.env.MONGO + '/express-todo';
console.log('Using Mongo URI ' + mongoUri);

mongoose.connect(mongoUri);

User = mongoose.model('User');
User.find({username: 'admin'}).exec(function (err, users) {
  console.log(users);
  if (users.length === 0) {
    console.log('no admin');
    new User({username: 'admin', password: 'SuperSecretPassword'}).save(function (err) {
      if (err) {
        console.log('error saving admin user');
      }
    });
  }
});
