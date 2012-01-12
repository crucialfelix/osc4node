/**
 * Module dependencies.
 */
var jspack = require('jspack').jspack
  , OscType = require('../type');

/**
 * Constructor. OSC double (64bit).
 */
var OscDouble = module.exports = function OscDouble(value) {
  OscType.call(this, value);
};

/**
 * Inherits from OscType.
 */
OscDouble.prototype.__proto__ = OscType.prototype;

/**
 * OSC Double type tag.
 */
OscDouble.typeTag = 'd';

/**
 * Encode to Buffer.
 * 
 * @param {Buffer}
 * @param {int} position
 * @param {Number} value
 * @return {Buffer}
 * @api public
 */
OscDouble.prototype.encode = function(buffer, pos, value) {
  return jspack.PackTo('>d', buffer, pos || 0, [value || this._value]);
};

/**
 * Decode to Number.
 * 
 * @param {Buffer} to decode
 * @return {Number}
 * @api public
 */
OscDouble.prototype.decode = function(buffer) {
  this._givenBuffer = buffer;
  if (buffer.length < 8) {
    throw new Error('too short.');
  }
  this._length = 8;
  return jspack.Unpack('>d', buffer.slice(0, 8))[0];
};

/**
 * Detect value.
 * 
 * @param {var} value
 * @return {Boolean}
 * @api public
 */
OscDouble.prototype.detect = function(value) {
  return Object.prototype.toString.call(value) === '[object Number]' && value !== ~~value;
};
