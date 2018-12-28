import { service } from '@ember-decorators/service';
import Component from 'sparkles-component';

import { CATEGORY_NAMES, CategoryName } from 'hunfencing/models/category';

export default class RankingsCategoryFilter extends Component {
  @service router!: any;

  categories = ['senior', 'junior', 'cadet'];

  select(category: string) {
    this.router.transitionTo({ queryParams: { category } });
  }
}
