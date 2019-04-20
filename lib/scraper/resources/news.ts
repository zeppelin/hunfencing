/// <reference path="../../../types/global.d.ts" />
import axios from 'axios';
import * as $ from 'cheerio';

import { serializeToJSONAPIFormat } from '../api';

const INDEX_URL = 'http://hunfencing.hu';
const ITEM_BASE_URL = 'http://hunfencing.hu/hir';

export const scrapeNewsIndex = async () => {
  let { data } = await axios.get(INDEX_URL);

  let news = [];

  $('#content .news-box', data).each((index, element) => {
    let sourceUrl = $(element).find('a').first().attr('href');
    let id = extractIdFromURL(sourceUrl);

    let title = $(element).find('.p-title').text().trim();
    let desc = $(element).find('.p-news').text().trim();
    let thumb = $(element).find('figure img').attr('src');
    let content = null; // Content is empty on the index page

    news.push({ id, title, desc, thumb, content, sourceUrl });
  });

  return serializeToJSONAPIFormat('news', news, {});
};

export const scrapeNewsItem = async (id: string) => {
  let sourceUrl = `${ITEM_BASE_URL}/${id}`;
  let { data } = await axios.get(sourceUrl);

  let title = $('.topic', data).first().text().trim();
  let thumb = $('.post-detail .content .cover-photo', data).first().attr('src');
  let desc = $('.post-detail .content', data).find('h4').text();

  let $content = $.load(data);

  $content('.cover-photo').remove();
  $content('.content > h4:first-child').remove();

  let content = $content('.post-detail .content').first().html();

  return {
    data: {
      id,
      type: 'news',
      attributes: {
        title,
        desc,
        thumb,
        content,
        sourceUrl
      }
    }
  };
};

const extractIdFromURL = (url: string): string => url.match(/\d+$/)[0];
