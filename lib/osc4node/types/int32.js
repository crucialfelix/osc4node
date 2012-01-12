/**
 * Module dependencies.
 */
var jspack = require('jspack').jspack
  , OscType = require('../type');

/**
 * Constructor. OSC int (32bit).
 */
var OscInt32 = module.exports = function OscInt32(value) {
  OscType.call(this, value);
};

/**
 * Inherits from OscType.
 */
OscInt32.prototype.__proto__ = OscType.prototype;

/**
 * OSC Int32 type tag.
 */
OscInt32.typeTag = 'i';

/**
 * Encode to Buffer.
 * 
 * @param {Buffer}
 * @param {int} position
 * @param {Number} value
 * @return {Buffer}
 * @api public
 */
OscInt32.prototype.encode = function(buffer, pos, value) {
  return jspack.PackTo('>i', buffer, pos || 0, [value || this.value]);
};

/**
 * Decode to Number.
 * 
 * @param {Buffer} to decode
 * @return {Number}
 * @api public
 */
OscInt32.prototype.decode = function(buffer) {
  this._givenBuffer = buffer;
  if (buffer.length < 4) {
    throw new Error('too short');
  }
  this._length = 4;
  return jspack.Unpack('>i', buffer.slice(0, 4))[0];
};

/**
 * Detect value.
 * 
 * @param {var} value
 * @return {Boolean}
 * @api public
 */
OscInt32.prototype.detect = function(value) {
  return Object.prototype.toString.call(value) === '[object Number]' && value === ~~value;
};
