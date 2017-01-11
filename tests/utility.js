const assert = require('assert')
const tman = require('tman')
const _ = require('../underscore.js')

tman.it('_.constant', function () {
  var stooge = {name: 'moe'}
  assert.strictEqual(_.constant(stooge)(), stooge, 'should create a function that returns stooge')
})

tman.it('_.random', function () {
  var array = _.range(1000)
  var min = Math.pow(2, 31)
  var max = Math.pow(2, 62)
  // TODO: _.every, _.some
  var every = [].every
  var some = [].some
  assert.ok(every.call(array, function () {
    return _.random(min, max) >= min
  }), 'should produce a random number greater than or equal to the minimum number')

  assert.ok(some.call(array, function () {
    return _.random(Number.MAX_VALUE) > 0
  }), 'should produce a random number when passed `Number.MAX_VALUE`')
})
