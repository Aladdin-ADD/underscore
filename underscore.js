const _ = function (obj) {
  if (obj instanceof _) { return obj }
  if (!(this instanceof _)) { return new _(obj) }
  this._wrapped = obj
}

// Current version.
_.version = '0.0.1'

module.exports = _

// 常用函数
_.noop = () => {}
_.identity = x => x

const toString = ({}).toString

// TODO: to support OO-style
// TODO: to support array-like object

// 类型判断
_.isType = type => val => toString.call(val) === '[object ' + type + ']'

_.isObject = _.isType('Object')
_.isFunc = _.isType('Function')
_.isArray = _.isType('Array')
_.isNumber = _.isType('Number')
_.isString = _.isType('String')
_.isBoolean = _.isType('Boolean')
_.isNull = _.isType('Null')
_.isUndefined = _.isType('Undefined')

_.first = _.head = _.take = function (arr, n = null) {
  if (arr === null || arr.length < 0) { return void 0 }
  if (n === null) { return arr[0] }
  if (n <= 0) { return [] }
  return arr.slice(0, n)
}

_.rest = _.tail = _.drop = function (arr, n = 1) {
  return arr.slice(n)
}

_.map = function (arr, fn = _.identity, cxt) {
  if (arr === null) return []
  let result = []
  for (let i = 0; i < arr.length; i++) {
    result[i] = fn.bind(cxt)(arr[i])
  }
  return result
}

_.initial = function (arr, n = arr.length - 1) {
  return n <= arr.length ? arr.slice(0, n) : []
}
_.last = function (arr, n) {
  if (arr === null || arr.length === 0) { return void 0 }
  const len = arr.length
  if (n === undefined) { return arr[len - 1] }
  if (n <= 0) { return [] }
  if (n > len) { return arr.slice() }
  return arr.slice(n - 1, len)
}
