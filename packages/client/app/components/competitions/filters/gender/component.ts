import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { toggle } from '@hunfencing/client/utils/array';

type GenderValue =  'm' | 'f';

export default class extends Component {
  @tracked genders: GenderValue[] = ['m', 'f'];

  get isAllSelected(): boolean {
    return this.genders.length === 2;
  }

  select(value: GenderValue, event: MouseEvent) {
    let shouldSelectMultiple = event.metaKey || event.ctrlKey;

    this.genders = shouldSelectMultiple
      ? toggle(this.genders, value, true)
      : [value];
  }

  selectAll() {
    this.genders = ['m', 'f'];
  }
}
