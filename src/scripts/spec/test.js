//mocha testing
'use strict';
//dependencies
var path = require('path'),
    Nightmare = require('nightmare'),
    should = require('chai').should(),
    fs = require('fs');

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

function runAllTests() {
  var testTypes = getDirectories(__dirname);
  for (var i in testTypes) {
      var testType = testTypes[i];
      describe(testType, function() {
      var tests = getFiles(__dirname + '/' + testType);
      for (var i in tests) {
        var test = tests[i];
        var testPath = './' + path.relative(__dirname, test);
        var runTest = require(testPath);
        runTest;
      }
    });
  }
}

runAllTests();
