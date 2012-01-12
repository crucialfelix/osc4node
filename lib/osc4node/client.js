/****************************************************
 *
 * OSC Client
 *
 ****************************************************/

var Client = module.exports = function(host, port) {
    if (!(this instanceof Client)) {
      return new Client(arguments);
    }
    
    var args = Array.prototype.slice.call(arguments)
      , host = args[0]
      , port = args[1];

    this._port = port;
    this._host = host;
};

Client.prototype.__defineGetter__('host', function() {
    return this._host;
});

Client.prototype.__defineGetter__('port', function() {
    return this._port;
});