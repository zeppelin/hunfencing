import { service } from '@ember-decorators/service';
import Component from 'sparkles-component';

export default class RankingsSeasonFilter extends Component {
  @service intl!: unsafe;
  @service cookies!: unsafe;

  selectLocale(locale: string) {
    this.cookies.write('locale', locale);
    this.intl.setLocale([locale, 'global']);
  }
}
