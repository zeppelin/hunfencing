'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'hunfencing',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.fastboot = {
    hostWhitelist: []
  };

  ENV.hunfencing = {
    apiHost: undefined, // Example format: `localhost:3000`
    defaultLocale: 'en'
  };

  // Disabled until it works with angle bracket syntax:
  // https://github.com/ebryn/ember-component-css/issues/61
  ENV['ember-component-css'] = {
    namespacing: false
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.fastboot.hostWhitelist = [/.*/];
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature

    ENV.fastboot.hostWhitelist = [/.*/]; // TODO: configure this!
  }

  return ENV;
};
