import { service } from '@ember-decorators/service';
import Component, { tracked } from 'sparkles-component';

import { CATEGORY_NAMES, CategoryName } from 'hunfencing/models/category';

export default class RankingsCategoryFilter extends Component<{
  category?: CategoryName;
}> {
  @service router!: any;

  categories: CategoryName[] = CATEGORY_NAMES;
  mainCategories: CategoryName[] = ['senior', 'junior', 'cadet'];

  select(category: string) {
    this.router.transitionTo({ queryParams: { category } });
  }

  @tracked('args')
  get isMainCategorySelected() {
    let { category } = this.args;
    if (!category) {
      return false;
    }

    return this.mainCategories.includes(category);
  }
}
