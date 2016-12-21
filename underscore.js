const _ = function (obj) {
  if (Object.getPrototypeOf(obj) === _) { return obj }
  if (!(this instanceof _)) { return new _(obj) }
  var o = Object.create(_)
  o._wrapped = obj
  return o
}

// Current version.
_.version = '0.0.1'

module.exports = _

// 常用函数
_.noop = () => {
}
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

_.compact = function (arr) {
  const result = []
  for (let i = 0, n = arr.length; i < n; i++) {
    if (arr[i]) { result.push(arr[i]) }
  }
  return result
}

_.flatten = function flatten (input, shallow = false, output = []) {
  input = input || []
  for (let i = 0, n = input.length; i < n; i++) {
    if (_.isArray(input[i])) {
      shallow ? output.push(...input[i]) : flatten(input[i], shallow, output)
    } else {
      output.push(input[i])
    }
  }
  return output
}

_.without = function (arr, ...args) {
  const result = []
  for (var i = 0, n = arr.length; i < n; i++) {
    if (!_.contains(args, arr[i])) {
      result.push(arr[i])
    }
  }
  return result
}

_.contains = function (arr, val, cb = _.identity) {
  for (var i = 0, n = arr.length; i < n; i++) {
    if (cb(arr[i]) === cb(val)) {
      return true
    }
  }
  return false
}

// TODO: support large-scale array
_.sortedIndex = function (arr, val, it = _.identity, cxt) {
  const fn = _.isFunc(it) ? it : x => (x[it])
  for (var i = 0, n = arr.length; i < n; i++) {
    if (fn.call(cxt, arr[i]) >= fn.call(cxt, val)) { return i }
  }
  return -1
}

_.uniq = function (arr, isSorted, it, cxt) {
  // 重载
  if (!_.isBoolean(isSorted)) {
    cxt = it
    it = isSorted
    isSorted = false
  }
  const _it = _.isString(it) ? x => x[it] : it
  const result = []
  for (let i = 0, n = arr.length; i < n; i++) {
    if (!_.contains(result, arr[i], _it)) {
      result.push(arr[i])
    }
  }
  return result
}

_.intersection = function (arr1, arr2) {
  arr1 = arr1 || []
  arr2 = arr2 || []
  const result = []
  for (let i = 0, n = arr1.length; i < n; i++) {
    if (_.contains(arr2, arr1[i]) && !_.contains(result, arr1[i])) {
      result.push(arr1[i])
    }
  }
  return result
}

_.union = function (...args) {
  const result = []
  for (let i = 0, n = args.length; i < n; i++) {
    for (let j = 0, m = args[i].length; j < m; j++) {
      if (!_.contains(result, args[i][j])) {
        result.push(args[i][j])
      }
    }
  }
  return result
}

_.difference = function (arr, ...args) {
  const result = []
  for (let i = 0, n = arr.length; i < n; i++) {
    if (!_.contains(result, arr[i]) && args.every(function (item) { return !_.contains(item, arr[i]) })) {
      result.push(arr[i])
    }
  }
  return result
}

_.zip = function (...args) {
  if (args.length === 1 && args[0] === null) return []
  const result = []
  const len = Math.max(...args.map(x => x.length))
  for (let i = 0; i < len; i++) {
    result.push(args.map(x => x[i]))
  }
  return result
}

_.unzip = function (arr) {
  arr = arr || []
  const result = []
  const len = Math.max(...arr.map(x => x.length))
  for (let i = 0; i < len; i++) {
    result[i] = arr.map(x => x[i])
  }
  return result
}

_.object = function (arr1, arr2) {
  const result = {}
  if (arr2) {
    arr1.forEach(function (item, index) { result[item] = arr2[index] })
  } else {
    arr1.forEach(function (item, index) { result[item[0]] = item[1] })
  }
  return result
}

_.indexOf = function (arr, val, fromIndex = false) {
  return _.isBoolean(fromIndex)
    ? (fromIndex ? bSearch(arr, val, 0, arr.length - 1) : search(arr, val))
    : (search(arr, val, fromIndex))
}

function bSearch (arr, val, sm, lg) {
  if (sm > lg) { return -1 }
  if (lg === sm) { return arr[sm] === val ? sm : -1 }
  const md = Math.floor((sm + lg) / 2)
  return arr[md] >= val ? bSearch(arr, val, sm, md) : bSearch(arr, val, md + 1, lg)
}

function search (arr, val, fromIndex = 0) {
  if (fromIndex < 0) { fromIndex = arr.length + fromIndex }
  for (let i = fromIndex, n = arr.length; i < n; i++) {
    // 需要检查NaN,NaN !== NaN
    if (arr[i] === val || (arr[i] !== arr[i] && val !== val)) { return i }
  }
  return -1
}

_.lastIndexOf = function (arr, val, fromIndex) {
  if (fromIndex === 0) { return arr[0] === val ? 0 : -1 }
  const falsy = [void 0, '', 0, false, NaN, null, void 0]
  if (_.contains(falsy, fromIndex)) { fromIndex = arr.length }
  if (!_.isNumber(fromIndex)) { fromIndex = arr.length }
  if (fromIndex < 0) { fromIndex = arr.length + fromIndex }
  for (let i = fromIndex; i >= 0; i--) {
    if (arr[i] === val || (arr[i] !== arr[i] && val !== val)) {
      return i
    }
  }
  return -1
}
