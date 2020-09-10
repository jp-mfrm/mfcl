import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import del from 'rollup-plugin-delete'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

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

const rollup = [
  {
    input: './src/lib/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    external,
    plugins
  }
]

export default rollup
