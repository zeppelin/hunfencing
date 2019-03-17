import * as ExpressHTTPServer from 'fastboot-app-server/src/express-http-server';

import app from './express-server';

const httpServer = new ExpressHTTPServer({
  app,
  gzip: true
});

export default httpServer;
