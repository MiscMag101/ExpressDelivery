const MyPassport = require('./config/MyPassport.js');
const app = require('./app');
module.exports = app('github', MyPassport);