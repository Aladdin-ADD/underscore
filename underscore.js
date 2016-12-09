const _ = function (obj) {
  if (obj instanceof _) { return obj }
  if (!(this instanceof _)) { return new _(obj) }
  this._wrapped = obj
}

module.exports = _

// 常用函数
_.ø = () => {}
_.identity = x => x
_.toString = ({}).toString

// 类型判断
_.isType = type => val => _.toString.call(val) === '[object ' + type + ']'

_.isObject = _.isType('Object')
_.isFunc = _.isType('Function')
_.isArray = _.isType('Array')
_.isNumber = _.isType('Number')
_.isString = _.isType('String')
_.isBoolean = _.isType('Boolean')
_.isNull = _.isType('Null')
_.isUndefined = _.isType('Undefined')

// _.first = (arr, index = 0) => index ? arr.slice(0, index) : arr[0];
