import buble from 'rollup-plugin-buble'
import json from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

var external = process.env.DEPS ? [] : [ 'acorn/dist/acorn.js', 'magic-string' ]

export default {
  entry: 'underscore',
  moduleName: '_',
  plugins: [
    json(),
    commonjs(),
    buble({
      include: [
        'underscore.js'
      ],
      transforms: {
        dangerousForOf: true
      }
    }),
    nodeResolve({
      jsnext: true,
      skip: external
    })
  ],
  external: external,
  globals: {
    'acorn/dist/acorn.js': 'acorn',
    'magic-string': 'MagicString'
  },
  sourceMap: !process.env.DEPS
}
