import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import del from 'rollup-plugin-delete'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'

// Paths
const rootDir = path.resolve()
const distDir = path.resolve(rootDir, './dist')
const indexFilePath = './src/lib/index.ts'

// Don't bundle dependencies
const external = ['prop-types', 'react-dom', 'react', 'react-transition-group/Transition', 'clsx']

const plugins = [
  del({ targets: ['dist/*'] }),
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

// add an index.js file
const rollup = [
  {
    input: indexFilePath,
    output: {
      file: `${distDir}/index.js`,
      format: 'cjs' // commonjs
    },
    external,
    plugins
  }
]

export default rollup
