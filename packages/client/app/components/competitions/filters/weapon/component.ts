import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { toggle } from '@hunfencing/client/utils/array';

type WeaponValue = 'e' | 'f' | 's';

export default class extends Component {
  @tracked weapons: WeaponValue[] = ['e', 'f', 's'];

  get isAllSelected(): boolean {
    return this.weapons.length === 3;
  }

  select(value: WeaponValue, event: MouseEvent) {
    let shouldSelectMultiple = event.metaKey || event.ctrlKey;

    this.weapons = shouldSelectMultiple
      ? toggle(this.weapons, value, true)
      : [value];
  }

  selectAll() {
    this.weapons = ['e', 'f', 's'];
  }
}
