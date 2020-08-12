#!/usr/bin/env node

/* eslint-disable no-console */
require('colors');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '../');
const componentPath = path.resolve(rootDir, './src/lib');
const utilsPath = path.resolve(componentPath, './utils');
const iconsPath = path.resolve(componentPath, './icons');
const distPath = path.resolve(rootDir, './dist');

const blackListDir = ['icons', 'utils'];

const execOptions = {
  shell: true,
};

/** Make Sure dist Folder Exists */
function setup() {
  // Clean dist
  execSync(`rm -rf ${distPath}/*`, { shell: true, stdio: 'inherit' });

  // Create dist folder
  if (!fs.existsSync(distPath)) fs.mkdirSync(distPath);
  console.log('dist folder cleaned'.yellow);
}

/** Copy SCSS */
const copyScss = () => {
  execSync(
    `find ${componentPath} -maxdepth 1 -type f -name \\*.scss -exec cp {} ./dist \\;`,
    execOptions,
  );
  console.log(
    `
CSS copied over
`.magenta,
  );
};

/** Bundle blackListed Directories */
const bundleBlackListed = () => {
  blackListDir.forEach(folder => {
    execSync(
      `BABEL_ENV=production babel --presets=@babel/preset-env ${componentPath}/${folder} -d ${distPath}/${folder} --ignore scss,test.js`,
      execOptions,
    );
  });
  console.log(
    `Icons and utils babelized
`.gray,
  );
};

/**
 * [findType get files or folders and spit it out into an array]
 * @param  {String} [filters='-type d'] [filters for find command]
 * @param  {String} [folderPath=componentPath] [path of directory]
 * @return {array}           [description]
 */
const findType = (filters = '-type d', folderPath = componentPath) => {
  const data = execSync(`find ${folderPath} ${filters}`, execOptions);
  return [
    ...new Set(
      data
        .toString()
        .split('\n')
        .map(folder => path.basename(folder)),
    ),
  ];
};

/** Build Entries Object */
const buildEntries = () => {
  let entries = {};
  const folders = findType();
  folders
    .filter(folder => blackListDir.indexOf(folder) === -1 || !folder) // Get rid of blacklisted directories
    .forEach(folder => {
      const data = execSync(
        `find ${componentPath} -type f -name ${folder}.jsx`,
      );
      const result = data
        .toString()
        .split('\n')
        .filter(d => !!d);
      if (result.length) {
        const [component] = result;
        entries[folder] = `./${path.relative(rootDir, component)}`;
      }
    });

  // Sort for readability
  entries = Object.keys(entries)
    .sort()
    .reduce(
      (prev, key) => ({
        ...prev,
        [key]: entries[key],
      }),
      {},
    );

  /** Write Entries JSON */
  fs.writeFileSync(
    `${distPath}/entries.json`,
    JSON.stringify(entries, null, 4),
    'utf8',
  );

  console.log('component entries object created'.blue);
  console.log(
    `Ready for rollup build!!
  `.green.bold,
  );
};

Promise.resolve(setup())
  .then(copyScss)
  .then(bundleBlackListed)
  .then(buildEntries)
  .catch(error => console.error(`Bundle Failed: ${error}`.red));
