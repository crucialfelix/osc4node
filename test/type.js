var assert = require('assert')
  , osc = require('../lib/osc4node/')
  , OscArgument = require('../lib/osc4node/argument')
  , OscType = require('../lib/osc4node/type');

var blob = OscArgument(new Buffer("10"));
console.log(blob);
console.log(blob.value);
console.log(blob.buffer);
console.log(blob);
console.log(OscArgument('Hello'));
console.log(OscArgument(10, 'i'));
console.log(OscArgument(10) instanceof OscType);
console.log(new OscArgument(10) instanceof OscType);
console.log(OscArgument(10.1));

console.log(OscArgument(10.001).constructor.name);
console.log(OscArgument(10.001).constructor.prototype.__proto__);

var f = OscArgument(10.1);
console.log(f.buffer);
console.log(f.value);
console.log(f);

var i = OscArgument(32768);
console.log(i.value);
console.log(i.buffer);
console.log(i);

/*
describe('first', function() {
  it('should always succeed', function(done) {
    done();
  });
});
*/