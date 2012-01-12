exports.OscArgument = require('./datatypes');
exports.Message     = require('./message');
exports.Bundle      = require('./bundle');
exports.Server      = require('./server');
exports.Client      = require('./client');

/**
 * Register aliases.
 */
exports.server = exports.createServer = exports.Server;
exports.client = exports.createClient = exports.Client;
exports.message = exports.createMessage = exports.Message;
exports.bundle = exports.createBundle = exports.Bundle;
