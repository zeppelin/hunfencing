/// <reference path="../../../types/global.d.ts" />
import * as $ from 'cheerio';
import * as rp from 'request-promise';

import IRanking from '../../../app/models/ranking';
import Cache, { needsUpdate } from '../../fastboot-server/cache';
import { formatURL, serializeToJSONAPIFormat } from '../api';
import { readMappingsFromFile } from '../mappings';
import { IParamMapping } from '../params';
import { ROOT_URL } from './';

const CACHE_TTL_PARSED = parseInt(process.env.SCRAPER_CACHE_TTL_MINUTES, 10);
const CACHE_TTL_MINUTES = !isNaN(CACHE_TTL_PARSED) ? CACHE_TTL_PARSED : 5; // 5 minutes default

const CACHE_TTL_MS = 1000 * 60 * (CACHE_TTL_MINUTES);

const makeRequest = async (url: string, mappings: Dict<unknown>) => {
  let html = await rp(url);

  let responseJSON = extractRows(html);
  return serializeToJSONAPIFormat('rankings', responseJSON, mappings.attributes as Dict<Dict<unknown>>);
};

const extractRows = (html: string): IRanking[] => {
  let rows = [];
  // `table tr`, because the id `#myTable` is absent in veteran results :P
  $('table tr', html).each((index, element) => {
    if (index === 0) { // Skip table header
      return;
    }

    let path = $(element).find('a').first().attr('href');
    let link = `${ROOT_URL}/${path}`;
    let id = new URL(link).searchParams.get('sorszam');
    let cells = $(element).find('td').map((_index, el) => $(el).text()).get();

    let [rank, name, club, birthdate, category, points] = cells;
    rows.push({ id, rank, name, club, birthdate, category, points, link });
  });

  return rows;
};

export const scrapeRankings = async (params: Dict<string>) => {
  let mappings = await readMappingsFromFile('rankings');

  let baseURL = `${ROOT_URL}/index.php?p=pRanglista&submit=Mutat`;
  let url = formatURL(baseURL, params, mappings.queryParams as IParamMapping);

  let cached = await Cache.get(url);

  if (cached) {
    let { value, lastUpdated } = cached;

    if (needsUpdate(lastUpdated, CACHE_TTL_MS)) {
      // Deliberately not waiting for these, because we already have the cached
      // value, returning an expired cache is much better than having to wait
      // for the external service.
      (async () => {
        let result = await makeRequest(url, mappings);
        Cache.set(url, JSON.stringify(result));
      })();
    }

    return JSON.parse(value);
  }

  let serialized = await makeRequest(url, mappings);

  await Cache.set(url, JSON.stringify(serialized));

  return serialized;
};
