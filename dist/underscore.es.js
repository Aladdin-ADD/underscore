var _ = function () {};
var underscore = _;

// 常用的函数
_.ø = function () {};
_.identity = function (x) { return x; };
_.toString = ({}).toString;

// 类型判断
_.isType = function (type) { return function (val) { return _.toString.call(val) === '[object ' + type + ']'; }; };

_.isObject = _.isType('Object');
_.isFunc = _.isType('Function');
_.isArray = _.isType('Array');
_.isNumber = _.isType('Number');
_.isString = _.isType('String');
_.isBoolean = _.isType('Boolean');
_.isNull = _.isType('Null');
_.isUndefined = _.isType('Undefined');

export default underscore;
//# sourceMappingURL=underscore.es.js.map
