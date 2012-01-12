/**
 * Module dependencies.
 */
var jspack = require('jspack').jspack
  , OscType = require('../type');

/**
 * Constructor. OSC string.
 */
var OscString = module.exports = function OscString(value) {
  OscType.call(this, value);
};

/**
 * Inherits from OscType.
 */
OscString.prototype.__proto__ = OscType.prototype;

/**
 * OSC String type tag.
 */
OscString.typeTag = 's';

/**
 * Encode to Buffer.
 * 
 * @param {Buffer}
 * @param {int} position
 * @param {String} value
 * @return {Buffer}
 * @api public
 */
OscString.prototype.encode = function(buffer, pos, value) {
  var length = Math.ceil(((value || this._value).length + 1) / 4.0) * 4;
  return jspack.PackTo('>' + length + 's', buffer, pos || 0, [value || this._value]);
};

/**
 * Decode to Number.
 * 
 * @param {Buffer} to decode
 * @return {String}
 * @api public
 */
OscString.prototype.decode = function(buffer, pos) {
  var end = 0;
  this._givenBuffer = buffer;
  while (buffer[end] && end < buffer.length) {
      end++;
  }
  if (end === buffer.length) {
      throw Error('Osc string not null terminated');
  }
  this._length = parseInt(Math.ceil((end + 1) / 4.0) * 4);
  return buffer.toString('ascii', pos || 0, end);
};

/**
 * Detect value.
 * 
 * @param {var} value
 * @return {Boolean}
 * @api public
 */
OscString.prototype.detect = function(value) {
  return Object.prototype.toString.call(value) === '[object String]';
};
