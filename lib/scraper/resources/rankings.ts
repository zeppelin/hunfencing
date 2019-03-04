/// <reference path="../../../types/global.d.ts" />
import * as $ from 'cheerio';
import * as rp from 'request-promise';

import IRanking from '../../../app/models/ranking';
import { formatURL, serializeToJSONAPIFormat } from '../api';
import { readMappingsFromFile } from '../mappings';
import { IParamMapping } from '../params';

export const extractRows = (html: string): IRanking[] => {
  let rows = [];
  // `table tr`, because the id `#myTable` is absent in veteran results :P
  $('table tr', html).each((index, element) => {
    if (index === 0) { // Skip table header
      return;
    }

    let result = $(element).find('td').map((_index, el) => $(el).text()).get();
    let [rank, name, club, birthdate, category, points] = result;
    rows.push({ rank, name, club, birthdate, category, points });
  });

  return rows;
};

export const scrapeRankings = async (params: Dict<string>) => {
  let mappings = await readMappingsFromFile('rankings');

  let baseURL = 'http://versenyinfo.hunfencing.hu/index.php?p=pRanglista&submit=Mutat';
  let url = formatURL(baseURL, params, mappings.queryParams as IParamMapping);

  let html = await rp(url);

  let responseJSON = extractRows(html);
  return serializeToJSONAPIFormat('rankings', responseJSON, mappings.attributes as Dict<Dict<unknown>>);
};
