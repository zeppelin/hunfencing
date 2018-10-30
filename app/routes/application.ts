import Route from '@ember/routing/route';
import { service } from '@ember-decorators/service';

export default class Application extends Route {
  @service intl!: any;

  beforeModel() {
    return this.intl.setLocale(['en-us']);
  }
}
