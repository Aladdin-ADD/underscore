const _ = {};
module.exports = _;

// 常用的函数
_.ø = () => {};
_.identity = x => x;
_.toString = ({}).toString;

// 类型判断
_.isType = type => val => _.toString.call(val) === '[object ' + type + ']';

_.isFunc = _.isType('Function');
_.isArray = _.isType('Array');
_.isNumber = _.isType('Number');
_.isString = _.isType('String');
_.isBoolean = _.isType('Boolean');
_.isNull = _.isType('Null');
_.isUndefined = _.isType('Undefined');