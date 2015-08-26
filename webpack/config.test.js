var config = require('./config');

//delete uneeded config values for when we are running tests
delete config.context;
delete config.entry;
delete config.output;
delete config.devServer;

module.exports = config;
