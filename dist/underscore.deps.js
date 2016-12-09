(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.underscore = factory());
}(this, (function () { 'use strict';

function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

var underscore = __commonjs(function (module) {
var _ = {};
module.exports = _;

// 常用的函数
_.ø = function () {};
_.identity = function ( x ) { return x; };
_.toString = ({}).toString;

// 类型判断
_.isType = function ( type ) { return function ( val ) { return _.toString.call(val) === '[object ' + type + ']'; }; };

_.isFunc = _.isType('Function');
_.isArray = _.isType('Array');
_.isNumber = _.isType('Number');
_.isString = _.isType('String');
_.isBoolean = _.isType('Boolean');
_.isNull = _.isType('Null');
_.isUndefined = _.isType('Undefined');
});

var underscore$1 = (underscore && typeof underscore === 'object' && 'default' in underscore ? underscore['default'] : underscore);

return underscore$1;

})));
