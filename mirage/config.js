import newsFixtures from './fixtures/news';
import newsItemFixtures from './fixtures/news-item';
import { handleRankings } from './handlers/rankings';
import ENV from 'hunfencing/config/environment';

const API_HOST = ENV.hunfencing.apiHost;

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.urlPrefix = 'http://localhost:4200';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '/api';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/news', newsFixtures);
  this.get('/news/:id', newsItemFixtures);
  this.get('/rankings', handleRankings);

  if (API_HOST) {
    this.passthrough(`${window.location.protocol}//${API_HOST}/api/**`);
  }
}
