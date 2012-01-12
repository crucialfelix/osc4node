/**
 * Module dependencies.
 */
var jspack = require('jspack').jspack
  , OscType = require('../type');

/**
 * Constructor. OSC blob.
 * 
 * @param {value}
 */
var OscBlob = module.exports = function OscBlob(value) {
  OscType.call(this, value);
  this._value = value;
};

/**
 * Inherits from OscType.
 */
OscBlob.prototype.__proto__ = OscType.prototype;

/**
 * OSC Blob type tag.
 */
OscBlob.typeTag = 'b';

/**
 * Encode buffer to blob.
 * 
 * @param {Buffer} to encode
 * @param {int} position
 * @param {Buffer} value
 * @return {Buffer}
 * @api public
 */
OscBlob.prototype.encode = function(buffer, pos, value) {
  var length = Math.ceil((value.length) / 4.0) * 4;
  return jspack.PackTo('>i' + length + 's', buffer, pos || 0, [length, value || this._value]);
};

/**
 * Decode to Buffer.
 * 
 * @param {Buffer} to decode
 * @return {Buffer}
 * @api public
 */
OscBlob.prototype.decode = function(buffer) {
  this._givenBuffer = buffer;
  this._length = jspack.Unpack('>i', buffer.slice(0, 4))[0];
  return buffer.slice(4, length + 4);
};

/**
 * Detect value.
 * 
 * @param {var} value
 * @return {Boolean}
 * @api public
 */
OscBlob.prototype.detect = function(value) {
  return Buffer.isBuffer(value);
};
