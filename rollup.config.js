import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'

import entries from './dist/entries.json' // eslint-disable-line import/no-unresolved
import mfclComponents from './dist/components' // eslint-disable-line import/no-unresolved

// Paths
const rootDir = path.resolve()
const distDir = path.resolve(rootDir, './dist')
const indexFilePath = './src/index.ts'

// Don't bundle dependencies
const external = [
  'prop-types',
  'react-dom',
  'react',
  'react-transition-group/Transition',
  'clsx',
  '@popperjs/core',
  'react-popper',
  ...mfclComponents // don't bundle itself when components reuse other components
]

const plugins = [
  typescript({ tsconfigOverride: { compilerOptions: { declaration: false } } }),
  postcss({
    modules: {},
    inject: {
      insertAt: 'top' // inserts styles at top of head instead of bottom. This prevents overriding custom styles
    }
  }),
  resolve({
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }),
  filesize(),
  commonjs()
]

// Build export array
const rollupEntries = Object.entries(entries).map(([name, input]) => ({
  input,
  output: {
    file: `${distDir}/${name}/index.js`,
    format: 'cjs',
    exports: 'auto'
  },
  external,
  plugins
}))

// add an index.js file
const rollup = [
  ...rollupEntries,
  {
    input: indexFilePath,
    output: {
      file: `${distDir}/index.js`,
      format: 'cjs'
    },
    external,
    plugins: [
      typescript(),
      postcss({
        modules: {},
        inject: {
          insertAt: 'top' // inserts styles at top of head instead of bottom. This prevents overriding custom styles
        }
      }),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      filesize(),
      commonjs()
    ]
  }
]

export default rollup
