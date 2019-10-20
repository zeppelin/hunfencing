import * as cors from 'cors';
import * as express from 'express';

import { scrapeUpcoming } from '../scraper/resources/competitions';
import { scrapeRankings } from '../scraper/resources/rankings';

const app = express();

app.use(cors());

app.get('/api/rankings', async (req, res) => {
  let data = await scrapeRankings(req.query);
  res.json(data);
});

app.get('/api/competitions', async (req, res) => {
  let data = await scrapeUpcoming();
  res.json(data);
});

(async ()=> {
  let data = await scrapeUpcoming();
  //
  console.log(data.data.map(({ attributes }) => attributes));
})()

export default app;
