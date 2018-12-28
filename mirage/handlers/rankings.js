import weRankingFixtures from '../fixtures/ranking-w-e';
import meRankingFixtures from '../fixtures/ranking-m-e';

export function handleRankings(_schema, { queryParams }) {
  let { category, gender, weapon, season } = queryParams;

  if (weapon !== 'e' || season !== 'current' || category !== 'senior') {
    return [];
  }

  if (gender === 'm') {
    return meRankingFixtures;
  }

  if (gender === 'f') {
    return weRankingFixtures;
  }

  return [];
}