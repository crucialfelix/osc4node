/**
 * OSC type abstruction.
 */
var OscType = module.exports = function(value) {
  if (arguments.length < 1) {
    return;
  }
  if (Buffer.isBuffer(value)) {
    this._buffer = value;
    this._givenBuffer = value;
  } else if (this.detect(value)) {
    this._value = value;
  } else {
    throw new Error();
  }
};

/**
 * Get JavaScript object.
 * 
 * @return {value}
 * @api public
 */
OscType.prototype.__defineGetter__('value', function() {
  if (!this._value) {
    this._value = this.decode(this._buffer);
  }
  return this._value;
});

/**
 * Get Buffer
 * 
 * @return {Buffer}
 * @api public
 */
OscType.prototype.__defineGetter__('buffer', function() {
  if (!this._buffer) {
    this.encode(this._buffer = []);
  }
  return this._buffer;
});

/**
 * Get next Buffer
 * 
 * @return {Buffer}
 * @api public
 */
OscType.prototype.__defineGetter__('next', function() {
  if (!this._givenBuffer) {
    return;
  }
  return this._givenBuffer.slice(this._length);
});
