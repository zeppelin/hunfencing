import { service } from '@ember-decorators/service';
import Route from '@ember/routing/route';
import FastBootService from 'ember-cli-fastboot/service';
import fetch from 'fetch';

import { makeBaseURL } from 'hunfencing/lib/api';

export default class Index extends Route {
  @service fastboot!: FastBootService;

  async model() {
    if (this.fastboot.isFastBoot) {
      return;
    }

    let url = makeBaseURL('news');

    let response = await fetch(url);
    let { data } = await response.json();

    return data.map((
      { id, attributes }: { id: string, attributes: Dict<unknown> }
    ) => ({ id, ...attributes }));
  }
}
