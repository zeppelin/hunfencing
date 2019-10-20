import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { CategoryName, COMPETITION_CATEGORIES } from '@hunfencing/client/models/category';

export default class CompetitionsCategoryFilter extends Component<{
  categories: CategoryName[];
  onSelect: (value: CategoryName[]) => void;
}> {
  @service intl!: any;
  @service queryParams!: any;

  @tracked categories: CategoryName[] = [];

  @action
  select(category: CategoryName) {
    let { categories } = this.args;
    if (categories.includes(category)) {
      categories = categories.filter((c) => c !== category);
    } else {
      categories = COMPETITION_CATEGORIES.filter((c) =>
          categories.concat([category]).includes(c)
        );
    }

    this.args.onSelect(categories);
  }

  @action
  selectAll() {
    this.args.onSelect([]);
  }
}
