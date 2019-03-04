import { CategoryName } from './category';

export default interface IRanking {
  rank: string;
  name: string;
  club: string;
  birthdate: string;
  category: CategoryName;
  points: string;
}
