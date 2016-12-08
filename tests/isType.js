const assert = require('assert');
const tman = require('tman');
const _ = require('../underscore.js');

tman.it('isFunction test', function () {
  assert.strictEqual(_.isFunc(function (){}), true);
  assert.strictEqual(_.isFunc(1), false);
});

tman.it('isArray test', function () {
  assert.strictEqual(_.isArray([]), true);
  assert.strictEqual(_.isArray(1), false);
});

tman.it('isNumber test', function () {
  assert.strictEqual(_.isNumber(1), true);
  assert.strictEqual(_.isNumber(''), false);
});

tman.it('isString test', function () {
  assert.strictEqual(_.isString(''), true);
  assert.strictEqual(_.isString(1), false);
});

tman.it('isBoolean test', function () {
  assert.strictEqual(_.isBoolean(true), true);
  assert.strictEqual(_.isBoolean(false), true);
  assert.strictEqual(_.isBoolean(1), false);
});