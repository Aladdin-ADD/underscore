[![Build Status](https://travis-ci.org/Aladdin-ADD/underscore.svg?branch=master)](https://travis-ci.org/Aladdin-ADD/underscore)
[![Coverage Status](https://coveralls.io/repos/github/Aladdin-ADD/underscore/badge.svg?branch=master)](https://coveralls.io/github/Aladdin-ADD/underscore?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)   
# underscore
**WIP**
===
underscore + 100%测试

> + ES6编写
> + buble + rollup 编译打包
> + tman测试
> + 代码风格遵守[JS standard](http://standardjs.com/)

## API ([underscore](http://underscorejs.org/))
---
### 数组函数（Array Functions）

> 注： arguments（参数） 对象将在所有数组函数中工作 。然而, Underscore 函数的设计并不只是针对稀疏（"sparse" ）数组的.

+ first_.first(array, [n]) 别名： head, take

> 返回array（数组）的第一个元素。传递 n参数将返回数组中从第一个元素开始的n个元素（注：返回数组中前 n 个元素.）。
```js
_.first([5, 4, 3, 2, 1]);
=> 5
```

+ initial_.initial(array, [n]) 

> 返回数组中除了最后一个元素外的其他全部元素。 在arguments对象上特别有用。传递 n参数将从结果中排除从最后一个开始的n个元素（注：排除数组后面的 n 个元素）。

```js
_.initial([5, 4, 3, 2, 1]);
=> [5, 4, 3, 2]
```

+ last_.last(array, [n])

> 返回array（数组）的最后一个元素。传递 n参数将返回数组中从最后一个元素开始的n个元素（注：返回数组里的后面的n个元素）。

```js
_.last([5, 4, 3, 2, 1]);
=> 1
```

+ rest_.rest(array, [index]) 别名： tail, drop

> 返回数组中除了第一个元素外的其他全部元素。传递 index 参数将返回从index开始的剩余所有元素 。（感谢@德德德德撸 指出错误）

```js
_.rest([5, 4, 3, 2, 1]);
=> [4, 3, 2, 1]
```

+ compact_.compact(array)

> 返回一个除去所有false值的 array副本。 在javascript中, false, null, 0, "", undefined 和 NaN 都是false值.

```js
_.compact([0, 1, false, 2, '', 3]);
=> [1, 2, 3]
```

+ flatten_.flatten(array, [shallow]) 

> 将一个嵌套多层的数组 array（数组） (嵌套可以是任何层数)转换为只有一层的数组。 如果你传递 shallow参数，数组将只减少一维的嵌套。

```js
_.flatten([1, [2], [3, [[4]]]]);
=> [1, 2, 3, 4];

_.flatten([1, [2], [3, [[4]]]], true);
=> [1, 2, 3, [[4]]];
```

+ without_.without(array, *values)

> 返回一个删除所有values值后的 array副本。（注：使用===表达式做相等测试。）

```js
_.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
=> [2, 3, 4]
```

+ union_.union(*arrays)

> 返回传入的 arrays（数组）并集：按顺序返回，返回数组的元素是唯一的，可以传入一个或多个 arrays（数组）。

```js
_.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
=> [1, 2, 3, 101, 10]
```

+ intersection_.intersection(*arrays) 

> 返回传入 arrays（数组）交集。结果中的每个值是存在于传入的每个arrays（数组）里。

```js
_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
=> [1, 2]
```

+ difference_.difference(array, *others) 

> 类似于without，但返回的值来自array参数数组，并且不存在于other 数组.

```js
_.difference([1, 2, 3, 4, 5], [5, 2, 10]);
=> [1, 3, 4]
```

+ uniq_.uniq(array, [isSorted], [iteratee]) 别名： unique 

> 返回 array去重后的副本, 使用 === 做相等测试. 如果您确定 array 已经排序, 那么给 isSorted 参数传递 true值, 此函数将运行的更快的算法. 如果要处理对象元素, 传参 iterator 来获取要对比的属性.

```js
_.uniq([1, 2, 1, 3, 1, 4]);
=> [1, 2, 3, 4]
```

+ zip_.zip(*arrays) 

> 将 每个arrays中相应位置的值合并在一起。在合并分开保存的数据时很有用. 如果你用来处理矩阵嵌套数组时, _.zip.apply 可以做类似的效果。

```js
_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
=> [["moe", 30, true], ["larry", 40, false], ["curly", 50, false]]

_.zip.apply(_, arrayOfRowsOfData);
=> arrayOfColumnsOfData
```

+ object_.object(list, [values]) 

> 将数组转换为对象。传递任何一个单独[key, value]对的列表，或者一个键的列表和一个值得列表。 如果存在重复键，最后一个值将被返回。

```js
_.object(['moe', 'larry', 'curly'], [30, 40, 50]);
=> {moe: 30, larry: 40, curly: 50}

_.object([['moe', 30], ['larry', 40], ['curly', 50]]);
=> {moe: 30, larry: 40, curly: 50}
```

+ indexOf_.indexOf(array, value, [isSorted]) 

> 返回value在该 array 中的索引值，如果value不存在 array中就返回-1。使用原生的indexOf 函数，除非它失效。如果您正在使用一个大数组，你知道数组已经排序，传递true给isSorted将更快的用二进制搜索..,或者，传递一个数字作为第三个参数，为了在给定的索引的数组中寻找第一个匹配值。

```js
_.indexOf([1, 2, 3], 2);
=> 1
```

+ lastIndexOf_.lastIndexOf(array, value, [fromIndex]) 

> 返回value在该 array 中的从最后开始的索引值，如果value不存在 array中就返回-1。如果支持原生的lastIndexOf，将使用原生的lastIndexOf函数。 传递fromIndex将从你给定的索性值开始搜索。

```js
_.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
=> 4
```

+ sortedIndex_.sortedIndex(list, value, [iteratee], [context]) 

> 使用二分查找确定value在list中的位置序号，value按此序号插入能保持list原有的排序。 如果提供iterator函数，iterator将作为list排序的依据，包括你传递的value 。 iterator也可以是字符串的属性名用来排序(比如length)。

```js
_.sortedIndex([10, 20, 30, 40, 50], 35);
=> 3

var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
_.sortedIndex(stooges, {name: 'larry', age: 50}, 'age');
=> 1
```

+ range_.range([start], stop, [step])

> 一个用来创建整数灵活编号的列表的函数，便于each 和 map循环。如果省略start则默认为 0；step 默认为 1.返回一个从start 到stop的整数的列表，用step来增加 （或减少）独占。值得注意的是，如果stop值在start前面（也就是stop值小于start值），那么值域会被认为是零长度，而不是负增长。-如果你要一个负数的值域 ，请使用负数step.

```js
_.range(10);
=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
_.range(1, 11);
=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
_.range(0, 30, 5);
=> [0, 5, 10, 15, 20, 25]
_.range(0, -10, -1);
=> [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
_.range(0);
=> []
```