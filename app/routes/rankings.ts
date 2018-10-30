import { service } from '@ember-decorators/service';
import Route from '@ember/routing/route';
import FastBoot from 'ember-cli-fastboot/service';
import fetch from 'fetch';

export default class RankingsRoute extends Route {
  @service fastboot!: FastBoot;

  async model() {
    if (this.fastboot.isFastBoot) {
      return [];
    }

    let response = await fetch(`http://localhost:4200/api/rankings`);
    return response.json();
  }
}
