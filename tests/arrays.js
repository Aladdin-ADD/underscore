const assert = require('assert')
const tman = require('tman')
const _ = require('../underscore.js')

tman.it('_.first test', function () {
  assert.strictEqual(_.first([1, 2, 3]), 1, 'can pull out the first element of an array')
  // assert.strictEqual(_([1, 2, 3]).first(), 1, 'can perform OO-style "first()"')
  assert.deepEqual(_.first([1, 2, 3], 0), [], 'returns an empty array when n <= 0 (0 case)')
  assert.deepEqual(_.first(null), void 0, 'returns undefined when arr = null')
  assert.deepEqual(_.first([]), void 0, 'returns undefined when arr = []')
  assert.deepEqual(_.first([1, 2, 3], -1), [], 'returns an empty array when n <= 0 (negative case)')
  assert.deepEqual(_.first([1, 2, 3], 2), [1, 2], 'can fetch the first n elements')
  assert.deepEqual(_.first([1, 2, 3], 5), [1, 2, 3], 'returns the whole array if n > length')
  var result = (function () { return _.first(arguments) }(4, 3, 2, 1))
  assert.strictEqual(result, 4, 'works on an arguments object')
  // result = _.map([[1, 2, 3], [1, 2, 3]], _.first)
  // assert.deepEqual(result, [1, 1], 'works well with _.map')
  // assert.strictEqual(_.first(null), void 0, 'returns undefined when called on null')

  // Array.prototype[0] = 'boo'
  // assert.strictEqual(_.first([]), void 0, 'return undefined when called on a empty array')
  // delete Array.prototype[0]
})

tman.it('_.first head', function () {
  assert.strictEqual(_.head, _.first, 'is an alias for first')
})

tman.it('_.rest _.tail drop', function () {
  var numbers = [1, 2, 3, 4]
  assert.deepEqual(_.rest(numbers), [2, 3, 4], 'fetches all but the first element')
  assert.deepEqual(_.rest(numbers, 0), [1, 2, 3, 4], 'returns the whole array when index is 0')
  assert.deepEqual(_.rest(numbers, 2), [3, 4], 'returns elements starting at the given index')
  assert.strictEqual(_.tail, _.rest, 'is an alias for rest')
  assert.strictEqual(_.drop, _.rest, 'is an alias for rest')
  // var result = (function () { return _(arguments).rest() }(1, 2, 3, 4))
  // assert.deepEqual(result, [2, 3, 4], 'works on an arguments object')
  // result = _.map([[1, 2, 3], [1, 2, 3]], _.rest)
  // assert.deepEqual(_.flatten(result), [2, 3, 2, 3], 'works well with _.map')
})

tman.it('_.map', function () {
  var doubled = _.map([1, 2, 3], function (num) { return num * 2 })
  assert.deepEqual(doubled, [2, 4, 6], 'doubled numbers')

  var tripled = _.map([1, 2, 3], function (num) { return num * this.multiplier }, {multiplier: 3})
  assert.deepEqual(tripled, [3, 6, 9], 'tripled numbers with context')

  // doubled = _([1, 2, 3]).map(function (num) { return num * 2 })
  // assert.deepEqual(doubled, [2, 4, 6], 'OO-style doubled numbers')

  // var ids = _.map({length: 2, 0: {id: '1'}, 1: {id: '2'}}, function (n) {
  //   return n.id
  // })
  // assert.deepEqual(ids, ['1', '2'], 'Can use collection methods on Array-likes.')

  assert.deepEqual(_.map(null, _.noop), [], 'handles a null properly')

  assert.deepEqual(_.map([1], function () {
    return this.length
  }, [5]), [1], 'called with context')

  // // Passing a property name like _.pluck.
  // var people = [{name: 'moe', age: 30}, {name: 'curly', age: 50}]
  // assert.deepEqual(_.map(people, 'name'), ['moe', 'curly'], 'predicate string map to object properties')
})

tman.it('_.initial', function () {
  assert.deepEqual(_.initial([1, 2, 3, 4, 5]), [1, 2, 3, 4], 'returns all but the last element')
  assert.deepEqual(_.initial([1, 2, 3, 4], 2), [1, 2], 'returns all but the last n elements')
  assert.deepEqual(_.initial([1, 2, 3, 4], 6), [], 'returns an empty array when n > length')
  // var result = (function () { return _(arguments).initial() }(1, 2, 3, 4))
  // assert.deepEqual(result, [1, 2, 3], 'works on an arguments object')
  var result = _.map([[1, 2, 3], [1, 2, 3]], _.initial)
  assert.deepEqual(result, [[1, 2], [1, 2]], 'works well with _.map')

  // result = _.map([[1, 2, 3], [1, 2, 3]], _.initial)
  // assert.deepEqual(_.flatten(result), [1, 2, 1, 2], 'works well with _.map')
})

tman.it('_.last', function () {
  assert.strictEqual(_.last([1, 2, 3]), 3, 'can pull out the last element of an array')
  // assert.strictEqual(_([1, 2, 3]).last(), 3, 'can perform OO-style "last()"')
  assert.deepEqual(_.last([1, 2, 3], 0), [], 'returns an empty array when n <= 0 (0 case)')
  assert.deepEqual(_.last([1, 2, 3], -1), [], 'returns an empty array when n <= 0 (negative case)')
  assert.deepEqual(_.last([1, 2, 3], 2), [2, 3], 'can fetch the last n elements')
  assert.deepEqual(_.last([1, 2, 3], 5), [1, 2, 3], 'returns the whole array if n > length')
  // var result = (function () { return _(arguments).last() }(1, 2, 3, 4))
  // assert.strictEqual(result, 4, 'works on an arguments object')
  var result = _.map([[1, 2, 3], [1, 2, 3]], _.last)
  assert.deepEqual(result, [3, 3], 'works well with _.map')
  assert.strictEqual(_.last(null), void 0, 'returns undefined when called on null')

  var arr = []
  arr[-1] = 'boo'
  assert.strictEqual(_.last(arr), void 0, 'return undefined when called on a empty array')
})

tman.it('_.compact', function () {
  assert.deepEqual(_.compact([1, false, null, 0, '', void 0, NaN, 2]), [1, 2], 'removes all falsy values');
  var result = (function(){ return _.compact(arguments); }(0, 1, false, 2, false, 3));
  assert.deepEqual(result, [1, 2, 3], 'works on an arguments object');
  result = _.map([[1, false, false], [false, false, 3]], _.compact);
  assert.deepEqual(result, [[1], [3]], 'works well with _.map');
})