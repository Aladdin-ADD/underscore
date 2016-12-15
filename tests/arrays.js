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
  assert.deepEqual(_.compact([1, false, null, 0, '', void 0, NaN, 2]), [1, 2], 'removes all falsy values')
  var result = (function () { return _.compact(arguments) }(0, 1, false, 2, false, 3))
  assert.deepEqual(result, [1, 2, 3], 'works on an arguments object')
  result = _.map([[1, false, false], [false, false, 3]], _.compact)
  assert.deepEqual(result, [[1], [3]], 'works well with _.map')
})

tman.it('_.flatten', function () {
  assert.deepEqual(_.flatten(null), [], 'supports null')
  assert.deepEqual(_.flatten(void 0), [], 'supports undefined')

  assert.deepEqual(_.flatten([[], [[]], []]), [], 'supports empty arrays')
  assert.deepEqual(_.flatten([[], [[]], []], true), [[]], 'can shallowly flatten empty arrays')

  var list = [1, [2], [3, [[[4]]]]]
  assert.deepEqual(_.flatten(list), [1, 2, 3, 4], 'can flatten nested arrays')
  assert.deepEqual(_.flatten(list, true), [1, 2, 3, [[[4]]]], 'can shallowly flatten nested arrays')
  var result = (function () { return _.flatten(arguments) }(1, [2], [3, [[[4]]]]))
  assert.deepEqual(result, [1, 2, 3, 4], 'works on an arguments object')
  list = [[1], [2], [3], [[4]]]
  assert.deepEqual(_.flatten(list, true), [1, 2, 3, [4]], 'can shallowly flatten arrays containing only other arrays')

  // assert.strictEqual(_.flatten([_.range(10), _.range(10), 5, 1, 3], true).length, 23, 'can flatten medium length arrays')
  // assert.strictEqual(_.flatten([_.range(10), _.range(10), 5, 1, 3]).length, 23, 'can shallowly flatten medium length arrays')
  // assert.strictEqual(_.flatten([new Array(1000000), _.range(56000), 5, 1, 3]).length, 1056003, 'can handle massive arrays')
  // assert.strictEqual(_.flatten([new Array(1000000), _.range(56000), 5, 1, 3], true).length, 1056003, 'can handle massive arrays in shallow mode')

// var x = _.range(100000)
// for (var i = 0; i < 1000; i++) x = [x]
// assert.deepEqual(_.flatten(x), _.range(100000), 'can handle very deep arrays')
// assert.deepEqual(_.flatten(x, true), x[0], 'can handle very deep arrays in shallow mode')
})

tman.it('_.without', function () {
  var list = [1, 2, 1, 0, 3, 1, 4]
  assert.deepEqual(_.without(list, 0, 1), [2, 3, 4], 'removes all instances of the given values')
  var result = (function () { return _.without(arguments, 0, 1) }(1, 2, 1, 0, 3, 1, 4))
  assert.deepEqual(result, [2, 3, 4], 'works on an arguments object')

  list = [{one: 1}, {two: 2}]
  assert.deepEqual(_.without(list, {one: 1}), list, 'compares objects by reference (value case)')
  assert.deepEqual(_.without(list, list[0]), [{two: 2}], 'compares objects by reference (reference case)')
})

tman.it('_.sortedIndex', function () {
  var numbers = [10, 20, 30, 40, 50]
  var indexFor35 = _.sortedIndex(numbers, 35)
  assert.strictEqual(indexFor35, 3, 'finds the index at which a value should be inserted to retain order')
  var indexFor30 = _.sortedIndex(numbers, 30)
  assert.strictEqual(indexFor30, 2, 'finds the smallest index at which a value could be inserted to retain order')

  var objects = [{x: 10}, {x: 20}, {x: 30}, {x: 40}]
  var iterator = function (obj) { return obj.x }
  assert.strictEqual(_.sortedIndex(objects, {x: 25}, iterator), 2, 'uses the result of `iterator` for order comparisons')
  assert.strictEqual(_.sortedIndex(objects, {x: 35}, 'x'), 3, 'when `iterator` is a string, uses that key for order comparisons')

  var context = {1: 2, 2: 3, 3: 4}
  iterator = function (obj) { return this[obj] }
  assert.strictEqual(_.sortedIndex([1, 3], 2, iterator, context), 1, 'can execute its iterator in the given context')

  // var values = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287,
  //   1048575, 2097151, 4194303, 8388607, 16777215, 33554431, 67108863, 134217727, 268435455, 536870911, 1073741823, 2147483647]
  // var largeArray = Array(Math.pow(2, 32) - 1)
  // var length = values.length
  // // Sparsely populate `array`
  // while (length--) {
  //   largeArray[values[length]] = values[length]
  // }
  // assert.strictEqual(_.sortedIndex(largeArray, 2147483648), 2147483648, 'works with large indexes')
})
