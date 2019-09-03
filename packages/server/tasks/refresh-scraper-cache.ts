import { readMappingsFromFile } from '@hunfencing/server/scraper/mappings';
import { ROOT_URL } from '@hunfencing/server/scraper/resources';
import { makeRequest } from '@hunfencing/server/scraper/resources/rankings';
import ora from 'ora';

import Cache from '../fastboot-server/cache';

const refreshRankings = async () => {
  let mappings = await readMappingsFromFile('rankings');
  let urls = await Cache.keys(`${ROOT_URL}*`);

  let spinner = ora();

  for (let [index, url] of urls.entries()) {
    try {
      spinner.start();
      spinner.text = `(${index + 1}/${urls.length}) Updating cache for ${url}`;

      let result = await makeRequest(url, mappings);
      await Cache.set(url, JSON.stringify(result));

      spinner.stop();
    } catch (err) {
      spinner.fail(`Error updating URL: ${url}`);
    }
  }

  spinner.stop();
};

(async () => {
  await refreshRankings();
  process.exit();
})();
