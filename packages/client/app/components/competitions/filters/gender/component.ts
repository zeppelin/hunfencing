import Component from '@glimmer/component';
import { hasSingleValueOf, toggle } from '@hunfencing/client/utils/array';

type GenderValue =  'm' | 'f';

export default class extends Component<{
  genders: GenderValue[];
  onSelect: (value: GenderValue[]) => void;
}> {
  get isAllSelected(): boolean {
    return this.args.genders.length === 2;
  }

  select(value: GenderValue, event: MouseEvent) {
    if (hasSingleValueOf(this.args.genders, value)) {
      return this.selectAll();
    }

    let shouldSelectMultiple = event.metaKey || event.ctrlKey;

    let genders = shouldSelectMultiple
      ? toggle(this.args.genders, value, true)
      : [value];

    this.args.onSelect(genders);
  }

  selectAll() {
    if (this.args.onSelect) {
      this.args.onSelect(['m', 'f']);
    }
  }
}
