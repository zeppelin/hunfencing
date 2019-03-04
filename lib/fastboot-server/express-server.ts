import * as cors from 'cors';
import * as express from 'express';

import { scrapeRankings } from '../scraper/resources/rankings';

const app = express();

app.use(cors());

app.get('/api/rankings', async (req, res) => {
  let data = await scrapeRankings(req.query);
  res.json(data);
});

export default app;
