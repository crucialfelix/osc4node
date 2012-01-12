/**
 * Module dependencies.
 */
var jspack = require('jspack').jspack
  , OscType = require('../type');

/**
 * Constructor. OSC timetag (64bit).
 */
var OscTimetag = module.exports = function OscTimetag(value) {
  OscType.call(this, value);
};

/**
 * Inherits from OscType.
 */
OscTimetag.prototype.__proto__ = OscType.prototype;

/**
 * OSC Timetag type tag.
 */
OscTimetag.typeTag = 't';

/**
 * Offset from 1.1.1900 - 1.1.1970
 */
OscTimetag.TIMETAG_OFFSET = 2208988800;

/**
 * Encode to Buffer.
 * 
 * @param {Buffer}
 * @param {int} position
 * @param {Number} value
 * @return {Buffer}
 * @api public
 */
OscTimetag.prototype.encode = function(buffer, pos, value) {
  return jspack.PackTo('>ll', buffer, pos || 0, value || this._value);
};

/**
 * Decode to Number.
 * 
 * @param {Buffer} to decode
 * @return {Number}
 * @api public
 */
OscTimetag.prototype.decode = function(buffer) {
  this._givenBuffer = buffer;

  if (buffer.length < 8) {
    throw new Error('too short.');
  }
  this._length = 8;
  return jspack.Unpack('>ll', buffer.slice(0, 8))[0];
};

/**
 * Detect value.
 * 
 * @param {var} value
 * @return {Boolean}
 * @api public
 */
OscTimetag.prototype.detect = function(value) {
  return Buffer.isBuffer(value);
};
