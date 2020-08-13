#!/usr/bin/env node

/* eslint-disable no-console */
require('colors')
const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

const rootDir = path.resolve(__dirname, '../')
const componentPath = path.resolve(rootDir, './src/lib')
const distPath = path.resolve(rootDir, './dist')

const execOptions = {
  shell: true
}

/** Make Sure dist Folder Exists */
function setup() {
  // Create dist folder
  if (!fs.existsSync(distPath)) {
    // Clean dist
    execSync(`rm -rf ${distPath}/*`, { shell: true, stdio: 'inherit' })
    // make dist
    fs.mkdirSync(distPath)
    console.log('dist folder cleaned'.yellow)
  }
}

/** Copy SCSS */
const copyScss = () => {
  execSync(`find ${componentPath} -maxdepth 1 -type f -name \\*.scss -exec cp {} ./dist \\;`, execOptions)
  console.log(
    `
CSS copied over
`.green
  )
}

Promise.resolve(setup())
  .then(copyScss)
  .catch((error) => console.error(`Bundle Failed: ${error}`.red))
