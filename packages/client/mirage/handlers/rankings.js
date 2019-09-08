import weRankingFixtures from '../fixtures/ranking-w-e';
import meRankingFixtures from '../fixtures/ranking-m-e';

const formatJSONAPI = (data, type) => {
  return {
    data: (data || []).map((item) => {
      return {
        id: null,
        type,
        attributes: item
      }
    })
  };
};

export function handleRankings(_schema, { queryParams }) {
  let { category, gender, weapon, season } = queryParams;

  if (season !== '2019-2020' || weapon !== 'e' || category !== 'senior') {
    return formatJSONAPI(null, 'rankings');
  }

  if (gender === 'm') {
    return formatJSONAPI(meRankingFixtures, 'rankings');
  }

  if (gender === 'f') {
    return formatJSONAPI(weRankingFixtures, 'rankings');
  }

  return formatJSONAPI(null, 'rankings');
}
