import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class RankingsSeasonFilter extends Component {
  @service intl!: unsafe;
  @service cookies!: unsafe;

  get currentLocale(): string {
    return this.intl.locale[0];
  }

  selectLocale(locale: string) {
    this.cookies.write('locale', locale);
    this.intl.setLocale([locale, 'global']);
  }
}
