import Controller from '@ember/controller';
import { action } from '@ember/object';
import { isBlank } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

import { CategoryName } from '../models/category';

type GenderParam =  'm' | 'f';
type GenderName =  'male' | 'female';
type WeaponParam = 'e' | 'f' | 's';
type WeaponName = 'epee' | 'foil' | 'sabre';

export default class Competitions extends Controller {
  model!: any[];

  hasTeamFilter = false;
  hasWheelchairFilter = false;

  @tracked weapons: WeaponParam[] = ['e', 'f', 's'];
  @tracked genders: GenderParam[] = ['m', 'f'];
  @tracked categories: CategoryName[] = [];

  get hasCategoryFilter() {
    return !isBlank(this.categories);
  }

  get hasGenderFilter() {
    return this.genders.length < 2;
  }

  get hasWeaponFilter() {
    return this.weapons.length < 3;
  }

  @action
  updateCategories(categories: CategoryName[]) {
    this.categories = categories;
  }

  @action
  updateGenders(genders: GenderParam[]) {
    this.genders = genders;
  }

  @action
  updateWeapons(weapons: WeaponParam[]) {
    this.weapons = weapons;
  }

  get filteredModel() {
    if (!this.model) {
      return [];
    }

    return this.model.filter((comp) => {
      return isBlank(this.categories) ? true : this.categories.includes(comp.category);
    }).filter((comp) => {
      return this.genders.length < 2
        ? this.genders.includes(toGenderAbbrev(comp.gender as ('male' | 'female')))
        : true;
    }).filter((comp) => this.weapons.includes(toWeaponAbbrev(comp.weapon)));
  }
}

const toGenderAbbrev = (gender: GenderName): GenderParam => {
  let map: Dict<GenderParam> = {
    male: 'm',
    female: 'f'
  };

  return map[gender];
};

const toWeaponAbbrev = (weapon: WeaponName): WeaponParam => {
  let map: Dict<WeaponParam> = {
    epee: 'e',
    foil: 'f',
    sabre: 's'
  };

  return map[weapon];
};
