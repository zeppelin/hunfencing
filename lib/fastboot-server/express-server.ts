import * as cors from 'cors';
import * as express from 'express';

import { scrapeNewsIndex, scrapeNewsItem } from '../scraper/resources/news';
import { scrapeRankings } from '../scraper/resources/rankings';

const app = express();

app.use(cors());

app.get('/api/rankings', async (req, res) => {
  let data = await scrapeRankings(req.query);
  res.json(data);
});

app.get('/api/news', async (req, res) => {
  let data = await scrapeNewsIndex();
  res.json(data);
});

app.get('/api/news/:id', async (req, res) => {
  let data = await scrapeNewsItem(req.params.id);
  res.json(data);
});

export default app;
