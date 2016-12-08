const assert = require('assert');
const tman = require('tman');

var count = 0;

tman.it('synchronous test', function () {
  assert.strictEqual(count++, 0);
});