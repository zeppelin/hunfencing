export const CATEGORY_NAMES = <Recast<
  ReadonlyArray<CategoryName>,
  CategoryName[]
>> Object.freeze([
  'amateur',
  'veteran70',
  'veteran60',
  'veteran50',
  'veteran40',
  'senior',
  'junior',
  'cadet',
  'u15',
  'u14',
  'u13'
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
  | 'senior'
  | 'junior'
  | 'cadet'
  | 'u15'
  | 'u14'
  | 'u13'
;
