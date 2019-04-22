import { service } from '@ember-decorators/service';
import Route from '@ember/routing/route';
import FastBootService from 'ember-cli-fastboot/service';
import fetch from 'fetch';

import { makeBaseURL } from 'hunfencing/lib/api';

export default class Index extends Route {
  @service fastboot!: FastBootService;
  @service simpleStore!: any;

  async model() {
    if (this.fastboot.isFastBoot) {
      return;
    }

    let existingRecords = this.simpleStore.find('news');
    if (existingRecords.length >= 6) { // There are 6 news item on the home page
      this.fetchRecords(); // Deliberately not `await`ing here
      return existingRecords;
    }

    return this.fetchRecords();
  }

  async fetchRecords() {
    let url = makeBaseURL('news');

    let response = await fetch(url);
    let { data } = await response.json();

    let records = data.map((
      { id, attributes }: { id: string, attributes: Dict<unknown> }
    ) => ({ id, ...attributes }));

    this.simpleStore.pushArray('news', records);
    return this.simpleStore.find('news');
  }
}
