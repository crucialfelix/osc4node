/**
 * Module dependencies.
 */
var jspack = require('jspack').jspack
  , OscType = require('../type');

/**
 * Constructor. OSC float (32bit).
 */
var OscFloat32 = module.exports = function OscFloat32(value) {
  OscType.call(this, value);
};

/**
 * Inherits from OscType.
 */
OscFloat32.prototype.__proto__ = OscType.prototype;

/**
 * OSC Float32 type tag.
 */
OscFloat32.typeTag = 'f';

/**
 * Encode to Buffer.
 * 
 * @param {Buffer}
 * @param {int} position
 * @param {Number} value
 * @return {Buffer}
 * @api public
 */
OscFloat32.prototype.encode = function(buffer, pos, value) {
  return jspack.PackTo('>f', buffer, pos || 0, [value || this._value]);
};

/**
 * Decode to Number.
 * 
 * @param {Buffer} to decode
 * @return {Number}
 * @api public
 */
OscFloat32.prototype.decode = function(buffer) {
  this._givenBuffer = buffer;
  if (buffer.length < 4) {
    throw new Error('too short');
  }
  this._length = 4;
  return jspack.Unpack('>f', buffer.slice(0, 4))[0];
};

/**
 * Detect value.
 * 
 * @param {var} value
 * @return {Boolean}
 * @api public
 */
OscFloat32.prototype.detect = function(value) {
  return Object.prototype.toString.call(value) === '[object Number]' && value !== ~~value;
};
