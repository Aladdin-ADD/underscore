function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

var underscore = __commonjs(function (module) {
var _ = function () {};
module.exports = _;

// 常用的函数
_.ø = function () {};
_.identity = function ( x ) { return x; };
_.toString = ({}).toString;

// 类型判断
_.isType = function ( type ) { return function ( val ) { return _.toString.call(val) === '[object ' + type + ']'; }; };

_.isObject = _.isType('Object');
_.isFunc = _.isType('Function');
_.isArray = _.isType('Array');
_.isNumber = _.isType('Number');
_.isString = _.isType('String');
_.isBoolean = _.isType('Boolean');
_.isNull = _.isType('Null');
_.isUndefined = _.isType('Undefined');

// _.first = (arr, index = 0) => index ? arr.slice(0, index) : arr[0];
});

var underscore$1 = (underscore && typeof underscore === 'object' && 'default' in underscore ? underscore['default'] : underscore);

export default underscore$1;
//# sourceMappingURL=underscore.es.js.map
