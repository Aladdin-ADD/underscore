const assert = require('assert')
const tman = require('tman')
const _ = require('../underscore.js')

tman.it('_.first test', function () {
  assert.strictEqual(_.first([1, 2, 3]), 1, 'can pull out the first element of an array')
  // assert.strictEqual(_([1, 2, 3]).first(), 1, 'can perform OO-style "first()"')
  assert.deepEqual(_.first([1, 2, 3], 0), [], 'returns an empty array when n <= 0 (0 case)')
  assert.deepEqual(_.first([1, 2, 3], -1), [], 'returns an empty array when n <= 0 (negative case)')
  assert.deepEqual(_.first([1, 2, 3], 2), [1, 2], 'can fetch the first n elements')
  assert.deepEqual(_.first([1, 2, 3], 5), [1, 2, 3], 'returns the whole array if n > length')
  var result = (function () { return _.first(arguments) }(4, 3, 2, 1))
  assert.strictEqual(result, 4, 'works on an arguments object')
  // result = _.map([[1, 2, 3], [1, 2, 3]], _.first)
  // assert.deepEqual(result, [1, 1], 'works well with _.map')
  assert.strictEqual(_.first(null), void 0, 'returns undefined when called on null')

  // Array.prototype[0] = 'boo'
  // assert.strictEqual(_.first([]), void 0, 'return undefined when called on a empty array')
  // delete Array.prototype[0]
})

tman.it('_.first head', function () {
  assert.strictEqual(_.head, _.first, 'is an alias for first')
})

tman.it('_.rest', function () {
  var numbers = [1, 2, 3, 4]
  assert.deepEqual(_.rest(numbers), [2, 3, 4], 'fetches all but the first element')
  assert.deepEqual(_.rest(numbers, 0), [1, 2, 3, 4], 'returns the whole array when index is 0')
  assert.deepEqual(_.rest(numbers, 2), [3, 4], 'returns elements starting at the given index')
  // var result = (function () { return _(arguments).rest() }(1, 2, 3, 4))
  // assert.deepEqual(result, [2, 3, 4], 'works on an arguments object')
  // result = _.map([[1, 2, 3], [1, 2, 3]], _.rest);
  // assert.deepEqual(_.flatten(result), [2, 3, 2, 3], 'works well with _.map');
})
