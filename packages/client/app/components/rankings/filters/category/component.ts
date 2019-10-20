import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { CATEGORY_NAMES, CategoryName } from '@hunfencing/client/models/category';

export default class RankingsCategoryFilter extends Component<{
  category?: CategoryName;
}> {
  @service router!: any;

  mainCategories: CategoryName[] = ['senior', 'junior', 'cadet'];

  get isMainCategorySelected() {
    let { category } = this.args;
    if (!category) {
      return false;
    }

    return this.mainCategories.includes(category);
  }
}
