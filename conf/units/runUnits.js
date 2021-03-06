'use strict'

// const _ = require('lodash')
const requirejs = require('requirejs')
const Jasmine = require('jasmine-core')
const loaderPlugin = require('./loaderPlugin.js')

////////////////////////////////////////////////////////////////////////////////

requirejs.config({
  baseUrl: 'proj2',
  paths: {
    math: 'main/math',
    name: 'main/name'
  }
})

loaderPlugin('loader', {
  proj1: {
    context: 'proj1',
    baseUrl: 'proj1',
    paths: {
      util: 'main/util',
      name: 'main/name'
    }
  }
})

const jasmineEnv = Jasmine.boot(Jasmine).getEnv()
const units = require('glob').sync('proj2/test/**/*.unit.js')

requirejs(units, () => {
  jasmineEnv.addReporter(new (require('jasmine-console-reporter'))())
  jasmineEnv.addReporter(require('./exitCodeReporter.js'))
  jasmineEnv.execute()
})
