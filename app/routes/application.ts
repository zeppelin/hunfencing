import { service } from '@ember-decorators/service';
import Route from '@ember/routing/route';

export default class Application extends Route {
  @service intl!: any;

  beforeModel() {
    return this.intl.setLocale(['en-us']);
  }
}
