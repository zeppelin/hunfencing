/* eslint-disable */
'use strict';

// Provide a title to the process in `ps`
process.title = 'ember-fastboot';

var FastBootAppServer = require('fastboot-app-server');
var RSVP = require('rsvp');
var parseArgs = require('minimist');
var httpServerPath = require('path').join(process.cwd(), 'dist-server/fastboot-server');
var httpServer = require(httpServerPath)['default'];

var argOptions = {
  default: { port: 3000, host: '::' }
};

var options = parseArgs(process.argv.slice(2), argOptions);
var distPath = options._[0];

if (!distPath) {
  console.error("You must call ember-fastboot with the path of a fastboot-dist directory:\n\n" +
      "  ember-fastboot fastboot-dist");
  process.exit(1);
}

var notifier = {
  subscribe: function(notify) {
    process.on('SIGUSR1', function() {
      console.log('Reloading Ember app from ' + distPath);

      notify();
    });

    return RSVP.Promise.resolve();
  }
};

let serverConfig = {
  httpServer,
  distPath: distPath,
  notifier: notifier,
  gzip: true
};


var server = new FastBootAppServer(serverConfig);

console.log('Booting Ember app...');

server.start();
