/* eslint-disable ember/no-global-jquery */
import * as cheerio from 'cheerio';
import * as rp from 'request-promise';

import { serializeToJSONAPIFormat } from '../api';
import { readMappingsFromFile } from '../mappings';
import { ROOT_URL } from './';

export const scrapeUpcoming = async () => {
  let mappings = await readMappingsFromFile('competitions');

  let html = await rp(`${ROOT_URL}/index.php?p=pNevezesek`);
  let paginationLinks = extractPaginationLinks(html);

  let pages = [html];

  if (paginationLinks.length) {
    let promises = paginationLinks.map((link) => rp(`${ROOT_URL}/${link}`));
    let htmls = await Promise.all(promises);

    pages = [...pages, ...htmls];
  }

  let rows = pages.reduce((acc, page) => {
    return acc.concat(extractUpcomingRows(page));
  }, []);

  let attributes = mappings.attributes as Dict<Dict<unknown>>;
  return serializeToJSONAPIFormat('competitions', rows, attributes);
}

export const scrapeCompetitions = async (params?: Dict<string>) => {
};

const extractPaginationLinks = (html: string): string[] => {
  let $ = cheerio.load(html);
  let paginations = $('.pagination');
  if (paginations.length) {
    let hrefs: string[] = paginations.find('a').map((_index, el) => $(el).attr('href')).get();
    return ([...new Set(hrefs)]).filter((href) => href !== '#');
  } else {
    return [];
  }
}

const extractUpcomingRows = (html: string) => {
  let rows = [];
  // `table tr`, because the id `#myTable` is absent in veteran results :P
  cheerio('table tr', html).each((index, element) => {
    if (index === 0) { // Skip table header
      return;
    }

    let path = cheerio(element).find('a').first().attr('href');
    let link = `${ROOT_URL}/${path}`;
    let cells = cheerio(element).find('td').map((_index, el) => cheerio(el).text()).get();

    // TODO: extract gender, team, wheelchair
    let [id, name, location, date, deadline, category, weapon, gender, team, wheelchair] = cells;
    rows.push({ id, name, location, date, deadline, category, weapon, gender, team, wheelchair, link });
  });

  return rows;
};
