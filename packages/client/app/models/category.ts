export const CATEGORY_NAMES = <Recast<
  ReadonlyArray<CategoryName>,
  CategoryName[]
>> Object.freeze([
  'amateur',
  'veteran70',
  'veteran60',
  'veteran50',
  'veteran40',
  'veteran',
  'senior',
  'junior',
  'cadet',
  'u15',
  'u14',
  'u13',
  'u12',
  'u11',
  'u10'
]);

export const COMPETITION_CATEGORIES = <Recast<
ReadonlyArray<CategoryName>,
CategoryName[]
>> Object.freeze([
  'senior',
  'junior',
  'cadet',
  'veteran',
  'amateur',
  'u15',
  'u14',
  'u13',
  'u12',
  'u11',
  'u10'
]);

export interface ICategory {
  name: CategoryName;
}

export type CategoryName =
  | 'amateur'
  | 'veteran70'
  | 'veteran60'
  | 'veteran50'
  | 'veteran40'
  | 'veteran'
  | 'senior'
  | 'junior'
  | 'cadet'
  | 'u15'
  | 'u14'
  | 'u13'
  | 'u12'
  | 'u11'
;
