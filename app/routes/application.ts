import { service } from '@ember-decorators/service';
import Route from '@ember/routing/route';

export default class Application extends Route {
  @service intl!: any;
  @service cookies!: unsafe;

  beforeModel() {
    let savedLocale: string = this.cookies.read('locale') || 'en-us';
    return this.intl.setLocale([savedLocale, 'global']);
  }
}
