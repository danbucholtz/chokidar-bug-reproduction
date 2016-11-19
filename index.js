
// delete the test directory before running this script if it exists
var fs = require('fs');
var path = require('path');

var chokidar = require('chokidar');

var DIRECTORY = path.join(process.cwd(), 'test');
var FILE_TO_WATCH = path.join(DIRECTORY, 'my-file.ts');

// create a directory
fs.mkdirSync(DIRECTORY);

// write a file
var fileContent = 'Here is some content in the file';
fs.writeFileSync(FILE_TO_WATCH, fileContent);

// watch the file
var watcher = chokidar.watch(FILE_TO_WATCH);
watcher.on('all', function(path, event) {
  console.log('Watcher callback fired for ' + path + ' and event ' + event);
});

watcher.on('ready', function() {
  console.log('My watcher is ready!');
  modifyFile();

  console.log('Go ahead and delete the test folder now via the gui ... we would expect the watch to fire again');
});


function modifyFile() {
  var fileContent = 'I am updating the file content';
  fs.writeFileSync(FILE_TO_WATCH, fileContent);
}