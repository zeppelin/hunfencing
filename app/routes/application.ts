import { service } from '@ember-decorators/service';
import Route from '@ember/routing/route';

const LOCALES = ['en', 'fr', 'hu'];

export default class Application extends Route {
  @service intl!: any;
  @service cookies!: unsafe;

  beforeModel() {
    let savedLocale: string = this.cookies.read('locale');

    if (!LOCALES.includes(savedLocale)) {
      savedLocale = 'en';
    }

    return this.intl.setLocale([savedLocale, 'global']);
  }
}
