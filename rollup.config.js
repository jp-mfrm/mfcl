import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
// import filesize from 'rollup-plugin-filesize';

import entries from './dist/entries.json'; // eslint-disable-line import/no-unresolved
import components from './dist/components'; // eslint-disable-line

// Paths
const rootDir = path.resolve();
const distDir = path.resolve(rootDir, './dist');
const indexFilePath = './src/lib/index';

// Don't bundle dependencies
const external = [
  'prop-types',
  'react-dom',
  'react',
  'react-transition-group/Transition',
  'react-dropzone',
  'react-swipeable',
  ...components, // don't bundle itself when components reuse other components
];

const plugins = [
  postcss({
    modules: {},
    inject: {
      insertAt: 'top', // inserts styles at top of head instead of bottom. This prevents overriding custom styles
    },
  }),
  url(),
  babel({
    exclude: 'node_modules/**',
  }),
  resolve({
    extensions: ['.js', '.jsx', '.svg.js'],
  }),
  commonjs(),
  // filesize(),
];

// Build export array
const rollupEntries = Object.entries(entries).map(([name, input]) => ({
  input,
  output: {
    file: `${distDir}/${name}/index.js`,
    format: 'cjs', // commonjs
  },
  external,
  plugins,
}));

// add an index.js file
const rollup = [
  ...rollupEntries,
  {
    input: indexFilePath,
    output: {
      file: `${distDir}/index.js`,
      format: 'cjs', // commonjs
    },
    external,
    plugins,
  },
];

export default rollup;
