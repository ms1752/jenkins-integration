var pkg = require('./package.json');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['source-map-support', 'mocha', 'sinon'],
    files: [
      'app/app.tests.js'
    ],
    exclude: [],
    preprocessors: {
      'app/app.tests.js': ['webpack', 'sourcemap'],
    },
    reporters: ['progress', 'junit'],
    junitReporter: {
      outputDir: 'reports', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'unit-test-report.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: pkg.name // suite will become the package name attribute in xml testsuite element
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [/*'Chrome', */'PhantomJS'],
    singleRun: false,
    webpack: require('./webpack/config.test'),
    webpackMiddleware: {
      noInfo: true
    }
  });
};
