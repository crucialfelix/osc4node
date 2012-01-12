/**
 * Module dependencies.
 */
var fs = require('fs')
  , path = require('path')
  , basename = path.basename
  , OscType = require('./type');

/**
 * OSC type object factory.
 * 
 * @param {OSCType}
 * @param {string}
 */
var OscArgument = module.exports = function(value, typeTag) {
  if (value.prototype instanceof OscType) {
    return value;
  }
  if (typeTag !== void 0) {
    return new exports.Types[typeTag](value);
  }
  for (var i in exports.Types) {
    var Type = exports.Types[i];
    if (Type.prototype.detect(value)) {
      return new Type(value);
    }
  }
  throw new Error('');
};

/**
 * Expose type list.
 */
exports.Types = {};


/**
 * Return OSC type constructor.
 * 
 * @param {string} type tag
 * @return {OSCType}
 * @api public
 */
OscArgument.getType = function(typeTag) {
  if (exports.Types[typeTag] === void 0) {
    throw new Error('');
  }
  return exports.Types[typeTag];
};

/**
 * Register OSC type constructor.
 * 
 * @param {OSCType} to register
 * @api public
 */
OscArgument.register = function(type) {
  if (!(type.prototype instanceof OscType)) {
    throw new Error('');
  }
  exports.Types[type.typeTag] = type;
};

/**
 * Register default type constructors.
 */
fs.readdirSync(__dirname + '/types').forEach(function(filename) {
  if (!/\.js$/.test(filename)) {
    return;
  }
  OscArgument.register(require('./types/' + basename(filename, '.js')));
});
