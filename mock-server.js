var pkg = require('./package.json');

/* Define some initial variables. */
var applicationRoot = __dirname.replace(/\\/g, '/'),
  ipaddress = pkg.mockConfig['mock-server-ip'] || '127.0.0.1',
  port = pkg.mockConfig['mock-server-port'] || 80;

// Set up hosts file to handle mock requests
var hostile = require('hostile');
var apiHost = pkg.mockConfig.api;
hostile.set('127.0.0.1', apiHost, function (err) {
  if (err) {
    console.error(err)
  } else {
    console.log('set /etc/hosts successfully!')
  }
})

console.log('START MOCK SERVER: applicationRoot [' + applicationRoot + ']');
console.log('START MOCK SERVER: ipaddress [' + ipaddress + ']');
console.log('START MOCK SERVER: port [' + port + ']');

var mockRoot = applicationRoot + pkg.mockConfig['mock-root'],
  mockFilePattern = '.json',
  mockRootPattern = mockRoot + '/**/*' + mockFilePattern,
  apiRoot = pkg.mockConfig['mock-api-root'],
  fs = require('fs'),
  glob = require('glob');

/* Create Express application */
var express = require('express');
var app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


/* Read the directory tree according to the pattern specified above. */
console.log('START MOCK SERVER: mockRootPattern = ' + mockRootPattern);

var files = glob.sync(mockRootPattern);
console.log('START MOCK SERVER: files  [' + files + ']');

/* Register mappings for each file found in the directory tree. */
if (files && files.length > 0) {
  files.forEach(function (fileName) {

    var mapping = apiRoot + fileName.replace(mockRoot, '').replace(mockFilePattern, '');

    app.get(mapping, function (req, res) {
      console.log('MOCK SERVER: GET CALL RECIEVIED  [' + files + ']');

      var data = fs.readFileSync(fileName, 'utf8');
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(data);
      res.end();
    });

    app.post(mapping, function (req, res) {
      console.log('MOCK SERVER: POST CALL RECIEVIED  [' + files + ']');

      var data = fs.readFileSync(fileName, 'utf8');
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(data);
      res.end();
    });

    console.log('Registered mapping: %s -> %s', mapping, fileName);
  })
} else {
  console.log('No mappings found! Please check the configuration.');
}

/* Start the API mock server. */
console.log('Application root directory: [' + applicationRoot + ']');

app.listen(port, ipaddress);
console.log('Mock Api Server listening: [http://' + ipaddress + ':' + port + ']');

if (process.platform === 'win32') {
  var rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('SIGINT', function () {
    process.emit('SIGINT');
  });
}

//graceful shutdown
process.on('SIGINT', function () {
  console.log('Caught interrupt signal');
  // remove api from hosts file
  hostile.remove('127.0.0.1', apiHost, function (err) {
    if (err) {
      console.error(err)
      process.exit();

    } else {
      console.log('remove /etc/hosts successfully!')
      process.exit();

    }
  })

});
