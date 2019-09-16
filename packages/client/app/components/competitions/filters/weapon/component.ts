import Component from '@glimmer/component';
import { hasSingleValueOf, toggle } from '@hunfencing/client/utils/array';

type WeaponValue = 'e' | 'f' | 's';

export default class extends Component<{
  weapons: WeaponValue[];
  onSelect: (weapons: WeaponValue[]) => void;
}> {
  get isAllSelected(): boolean {
    return this.args.weapons.length === 3;
  }

  select(value: WeaponValue, event: MouseEvent) {
    if (hasSingleValueOf(this.args.weapons, value)) {
      return this.selectAll();
    }

    let shouldSelectMultiple = event.metaKey || event.ctrlKey;
    let weapons = shouldSelectMultiple
      ? toggle(this.args.weapons, value, true)
      : [value];

    this.args.onSelect(weapons);
  }

  selectAll() {
    this.args.onSelect(['e', 'f', 's']);
  }
}
