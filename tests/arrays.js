// const assert = require('assert');
// const tman = require('tman');
// const _ = require('../underscore.js');

// tman.it('_.first test', function (){
//     assert.strictEqual(_.first([1, 2, 3]), 1);
//     assert.strictEqual(_.first([1, 2, 3]), 1, 'can pull out the first element of an array');
//     // assert.strictEqual(_([1, 2, 3]).first(), 1, 'can perform OO-style "first()"');
//     // assert.deepEqual(_.first([1, 2, 3], 0), [], 'returns an empty array when n <= 0 (0 case)');
//     // assert.deepEqual(_.first([1, 2, 3], -1), [], 'returns an empty array when n <= 0 (negative case)');
//     assert.deepEqual(_.first([1, 2, 3], 2), [1, 2], 'can fetch the first n elements');
//     assert.deepEqual(_.first([1, 2, 3], 5), [1, 2, 3], 'returns the whole array if n > length');
//     var result = (function(){ return _.first(arguments); }(4, 3, 2, 1));
//     assert.strictEqual(result, 4, 'works on an arguments object');
// });
