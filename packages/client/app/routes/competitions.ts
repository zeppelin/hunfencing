import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import FastBootService from 'ember-cli-fastboot/service';
import fetch from 'fetch';
import moment from 'moment';

import { deserializeJSONAPIResponse } from '../utils/json';

export default class RankingsRoute extends Route {
  @service fastboot!: FastBootService;

  async model() {
    if (this.fastboot.isFastBoot) {
      return;
    }

    let response = await fetch('/api/competitions');
    let json = await response.json();

    return deserializeJSONAPIResponse(json)
      .sort((a: any, b: any) =>
        (moment(a.date).format('YYYYMMDD') as any) - (moment(b.date).format('YYYYMMDD') as any)
      );
  }
}
