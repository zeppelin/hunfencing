import { scrapeRankings } from './resources/rankings';

const main = async () => {
  let params = {
    category: 'senior',
    gender: 'f',
    weapon: 'e',
    season: '2018-2019'
  };

  let jsonAPIResponse = await scrapeRankings(params);

  // tslint:disable-next-line: no-console
  console.log(JSON.stringify(jsonAPIResponse, null, 2));
};

main();
