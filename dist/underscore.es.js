var _ = function (obj) {
  if (Object.getPrototypeOf(obj) === _) { return obj }
  if (!(this instanceof _)) { return new _(obj) }
  var o = Object.create(_);
  o._wrapped = obj;
  return o
};

// Current version.
_.version = '0.0.1';

var underscore = _;

// 常用函数
_.noop = function () {};
_.identity = function (x) { return x };

var toString = ({}).toString;

// TODO: to support OO-style
// TODO: to support array-like object

// 类型判断
_.isType = function (type) { return function (val) { return toString.call(val) === '[object ' + type + ']'; }; };

_.isObject = _.isType('Object');
_.isFunc = _.isType('Function');
_.isArray = _.isType('Array');
_.isNumber = _.isType('Number');
_.isString = _.isType('String');
_.isBoolean = _.isType('Boolean');
_.isNull = _.isType('Null');
_.isUndefined = _.isType('Undefined');

_.first = _.head = _.take = function (arr, n) {
  if ( n === void 0 ) n = null;

  if (arr === null || arr.length < 0) { return void 0 }
  if (n === null) { return arr[0] }
  if (n <= 0) { return [] }
  return arr.slice(0, n)
};

_.rest = _.tail = _.drop = function (arr, n) {
  if ( n === void 0 ) n = 1;

  return arr.slice(n)
};

_.map = function (arr, fn, cxt) {
  if ( fn === void 0 ) fn = _.identity;

  if (arr === null) { return [] }
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result[i] = fn.bind(cxt)(arr[i]);
  }
  return result
};

_.initial = function (arr, n) {
  if ( n === void 0 ) n = arr.length - 1;

  return n <= arr.length ? arr.slice(0, n) : []
};
_.last = function (arr, n) {
  if (arr === null || arr.length === 0) { return void 0 }
  var len = arr.length;
  if (n === undefined) { return arr[len - 1] }
  if (n <= 0) { return [] }
  if (n > len) { return arr.slice() }
  return arr.slice(n - 1, len)
};

_.compact = function (arr) {
  var result = [];
  for (var i = 0, n = arr.length; i < n; i++) {
    if (arr[i]) { result.push(arr[i]); }
  }
  return result
};

_.flatten = function flatten (input, shallow, output) {
  if ( shallow === void 0 ) shallow = false;
  if ( output === void 0 ) output = [];

  input = input || [];
  for (var i = 0, n = input.length; i < n; i++) {
    if (_.isArray(input[i])) {
      shallow ? output.push.apply(output, input[i]) : flatten(input[i], shallow, output);
    } else {
      output.push(input[i]);
    }
  }
  return output
};

_.without = function (arr) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var result = [];
  for (var i = 0, n = arr.length; i < n; i++) {
    if (!_.contains(args, arr[i])) {
      result.push(arr[i]);
    }
  }
  return result
};

_.contains = function (arr, val, cb) {
  if ( cb === void 0 ) cb = _.identity;

  for (var i = 0, n = arr.length; i < n; i++) {
    if (cb(arr[i]) === cb(val)) {
      return true
    }
  }
  return false
};

// TODO: support large-scale array
_.sortedIndex = function (arr, val, it, cxt) {
  if ( it === void 0 ) it = _.identity;

  var fn = _.isFunc(it) ? it : function (x) { return (x[it]); };
  for (var i = 0, n = arr.length; i < n; i++) {
    if (fn.call(cxt, arr[i]) >= fn.call(cxt, val)) { return i }
  }
  return -1
};

_.uniq = function (arr, isSorted, it, cxt) {
  // 重载
  if (!_.isBoolean(isSorted)) {
    cxt = it;
    it = isSorted;
    isSorted = false;
  }
  var _it = _.isString(it) ? function (x) { return x[it]; } : it;
  var result = [];
  for (var i = 0, n = arr.length; i < n; i++) {
    if (!_.contains(result, arr[i], _it)) {
      result.push(arr[i]);
    }
  }
  return result
};

_.intersection = function (arr1, arr2) {
  arr1 = arr1 || [];
  arr2 = arr2 || [];
  var result = [];
  for (var i = 0, n = arr1.length; i < n; i++) {
    if (_.contains(arr2, arr1[i]) && !_.contains(result, arr1[i])) {
      result.push(arr1[i]);
    }
  }
  return result
};

_.union = function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var result = [];
  for (var i = 0, n = args.length; i < n; i++) {
    for (var j = 0, m = args[i].length; j < m; j++) {
      if (!_.contains(result, args[i][j])) {
        result.push(args[i][j]);
      }
    }
  }
  return result
};

_.difference = function (arr) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var result = [];
  var loop = function ( i, n ) {
    if (!_.contains(result, arr[i]) && args.every(function (item) { return !_.contains(item, arr[i]) })) {
      result.push(arr[i]);
    }
  };

  for (var i = 0, n = arr.length; i < n; i++) loop( i, n );
  return result
};

_.zip = function () {
  var args = [], len$1 = arguments.length;
  while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

  if (args.length === 1 && args[0] === null) { return [] }
  var result = [];
  var len = Math.max.apply(Math, args.map(function (x) { return x.length; }));
  var loop = function ( i ) {
    result.push(args.map(function (x) { return x[i]; }));
  };

  for (var i = 0; i < len; i++) loop( i );
  return result
};

_.unzip = function (arr) {
  arr = arr || [];
  var result = [];
  var len = Math.max.apply(Math, arr.map(function (x) { return x.length; }));
  var loop = function ( i ) {
    result[i] = arr.map(function (x) { return x[i]; });
  };

  for (var i = 0; i < len; i++) loop( i );
  return result
};

_.object = function (arr1, arr2) {
  var result = {};
  if (arr2) {
    arr1.forEach(function (item, index) { result[item] = arr2[index]; });
  } else {
    arr1.forEach(function (item, index) { result[item[0]] = item[1]; });
  }
  return result
};

_.indexOf = function (arr, val, fromIndex) {
  if ( fromIndex === void 0 ) fromIndex = false;

  return _.isBoolean(fromIndex)
    ? (fromIndex ? bSearch(arr, val, 0, arr.length - 1) : search(arr, val))
    : (search(arr, val, fromIndex))
};

function bSearch (arr, val, sm, lg) {
  if (sm > lg) { return -1 }
  if (lg === sm) { return arr[sm] === val ? sm : -1 }
  var md = Math.floor((sm + lg) / 2);
  return arr[md] >= val ? bSearch(arr, val, sm, md) : bSearch(arr, val, md + 1, lg)
}

function search (arr, val, fromIndex) {
  if ( fromIndex === void 0 ) fromIndex = 0;

  if (fromIndex < 0) { fromIndex = arr.length + fromIndex; }
  for (var i = fromIndex, n = arr.length; i < n; i++) {
    // 需要检查NaN,NaN !== NaN
    if (arr[i] === val || (arr[i] !== arr[i] && val !== val)) { return i } // eslint-disable-line
  }
  return -1
}

_.lastIndexOf = function (arr, val, fromIndex) {
  if (fromIndex === 0) { return arr[0] === val ? 0 : -1 }
  var falsy = [void 0, '', 0, false, NaN, null, void 0];
  if (_.contains(falsy, fromIndex)) { fromIndex = arr.length; }
  if (!_.isNumber(fromIndex)) { fromIndex = arr.length; }
  if (fromIndex < 0) { fromIndex = arr.length + fromIndex; }
  for (var i = fromIndex; i >= 0; i--) {
    if (arr[i] === val || (arr[i] !== arr[i] && val !== val)) { // eslint-disable-line
      return i
    }
  }
  return -1
};

_.findLastIndex = function (objects, fn, cxt) {
  objects = objects || [];
  var _fn = fn;
  if (_.isString(fn)) { _fn = function (x) { return x[fn]; }; }
  for (var i = objects.length - 1; i >= 0; i--) {
    if (_fn.call(cxt, objects[i], i, objects)) {
      return i
    }
  }
  return -1
};

_.range = function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var result = [];
  var start, end, step;
  if (args.length === 1) { start = 0; end = args[0]; step = start <= end ? 1 : -1; }
  if (args.length > 1) { start = args[0]; end = args[1]; step = args[2] || (start <= end ? 1 : -1); }
  var fn = (start <= end) ? function (s, e) { return (s < e); } : function (s, e) { return (s > e); };
  for (var i = start; fn(i, end); i += step) {
    result.push(i);
  }
  return result
};

_.chunk = function (arr, cnt) {
  var result = [];
  if (cnt == null || cnt < 1) { return result }
  for (var i = 0, n = arr.length; i < n; i += cnt) {
    result.push(arr.slice(i, i + cnt));
  }
  return result
};

// functions def:
_.bind = function (fn, cxt) {
  var args = [], len = arguments.length - 2;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 2 ];

  // if (!_.isFunc(fn)) { throw new TypeError('Bind must be called on a function') }
  function bound () {
    var _args = [], len = arguments.length;
    while ( len-- ) _args[ len ] = arguments[ len ];

    var _cxt = typeof new.target !== 'undefined' ? this : cxt;
    return fn.apply(_cxt, args.concat(_args))
  }
  bound.prototype = Object.create(fn.prototype);
  return bound
};

_.partial = function (fn) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  function _partial () {
    var _args = [], len = arguments.length;
    while ( len-- ) _args[ len ] = arguments[ len ];

    var result = [];
    var m = args.length;
    var n = _args.length;
    for (var i = 0, j = 0, k = 0; i < m || i < m + n - k; i++) {
      if (args[i] === _.partial.placeholder) {
        result[i] = _args[j++];
        k++;
      } else if (i >= m) {
        result[i] = j < n ? _args[j++] : void 0;
      } else {
        result[i] = args[i];
      }
    }
    return fn.apply(this, result)
  }
  _partial.prototype = Object.create(fn.prototype);
  return _partial
};
// set default placeholder to _
_.partial.placeholder = _;

_.bindAll = function (obj) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  args.forEach(function (key) {
    obj[key] = _.bind(obj[key], obj);
  });
};

_.memoize = function (fn, h) {
  function memoize () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var key = h && h.apply(void 0, args) || args.join();
    var cached = key in memoize.cache && memoize.cache.hasOwnProperty(key);
    /* eslint no-return-assign: 0 */
    return cached ? memoize.cache[key] : memoize.cache[key] = fn.apply(null, args)
  }
  memoize.cache = {};
  return memoize
};

_.delay = function (fn, timeout) {
  var args = [], len = arguments.length - 2;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 2 ];

  return setTimeout(function () { fn.apply(void 0, args); }, timeout)
};

_.defer = function (fn) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  return _.delay.apply(_, [ fn, 0 ].concat( args ))
};

_.now = Date.now;
// TODO: fix throttle
// _.throttle = function (fn, wait) {
//   let previous = 0
//   let timeout = null
//   let result
//   return function _throttle (...args) {
//     if (!previous) { previous = _.now(); return fn(...args) }
//     const now = _.now()
//     const left = wait - (now - previous)
//     if (left <= 0 || left > wait) {
//       timeout && clearTimeout(timeout)
//       timeout = null
//       previous = _.now()
//       result = fn(...args)
//     } else if (!timeout) {
//       timeout = _.delay(fn, left, ...args)
//     }
//     return result
//   }
// }
_.throttle = function (func, wait, options) {
  var context, args, result;
  var timeout = null;
  // 上次执行时间点
  var previous = 0;
  if (!options) { options = {}; }
  // 延迟执行函数
  var later = function () {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) { context = args = null; }
  };
  function throttled () {
    var now = _.now();
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) { previous = now; }
    // 延迟执行时间间隔
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout) { context = args = null; }
    // 如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result
  }

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled
};

  // Returns a function, that, as long as it continues to be invoked, will not

  // be triggered. The function will be called after it stops being called for

  // N milliseconds. If `immediate` is passed, trigger the function on the

  // leading edge, instead of the trailing.

_.debounce = function (func, wait, immediate) {
  var timeout, result;

  var later = function (context, args) {
    timeout = null;

    if (args) { result = func.apply(context, args); }
  };

  var debounced = _.restArgs(function (args) {
    if (timeout) { clearTimeout(timeout); }

    if (immediate) {
      var callNow = !timeout;

      timeout = setTimeout(later, wait);

      if (callNow) { result = func.apply(this, args); }
    } else {
      timeout = _.delay(later, wait, this, args);
    }

    return result
  });

  debounced.cancel = function () {
    clearTimeout(timeout);

    timeout = null;
  };

  return debounced
};

_.restArgs = function (func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;

  return function () {
    var arguments$1 = arguments;

    var length = Math.max(arguments.length - startIndex, 0);
    var rest = Array(length);
    var index = 0;

    for (; index < length; index++) {
      rest[index] = arguments$1[index + startIndex];
    }

    switch (startIndex) {
      case 0: return func.call(this, rest)
      case 1: return func.call(this, arguments[0], rest)
      case 2: return func.call(this, arguments[0], arguments[1], rest)
    }

    var args = Array(startIndex + 1);
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments$1[index];
    }
    args[startIndex] = rest;
    return func.apply(this, args)
  }
};

_.once = function (fn) {
  var result;
  var ret = function () {
    if (!ret.__called) {
      ret.__called = true;
      return result = fn()
    }
    return result
  };
  return ret
};

_.wrap = function (func, wrapper) {
  return _.partial(wrapper, func)
};

_.negate = function (predicate) {
  return function () {
    return !predicate.apply(this, arguments)
  }
};

_.compose = function () {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var this$1 = this;

    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) { result = args[i].call(this$1, result); }
    return result
  }
};

// Returns a function that will only be executed on and after the Nth call.
_.after = function (times, func) {
  return function () {
    if (--times < 1) {
      return func.apply(this, arguments)
    }
  }
};

// Returns a function that will only be executed up to (but not including) the Nth call.
_.before = function (times, func) {
  var memo;
  return function () {
    if (--times > 0) {
      memo = func.apply(this, arguments);
    }
    if (times <= 1) { func = null; }
    return memo
  }
};

export default underscore;
//# sourceMappingURL=underscore.es.js.map
