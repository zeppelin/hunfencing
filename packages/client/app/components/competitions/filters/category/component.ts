import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { CategoryName, COMPETITION_CATEGORIES } from '@hunfencing/client/models/category';

export default class CompetitionsCategoryFilter extends Component {
  @service intl!: any;
  @service queryParams!: any;

  @tracked categories: CategoryName[] = [];

  @action
  select(category: CategoryName) {
    if (this.categories.includes(category)) {
      this.categories = this.categories.filter((c) => c !== category);
    } else {
      this.categories = COMPETITION_CATEGORIES.filter((c) => this.categories.concat([category]).includes(c));
    }
  }

  @action
  selectAll() {
    this.categories = [];
  }
}
