import { service } from '@ember-decorators/service';
import Route from '@ember/routing/route';
// @ts-ignore: Cannot find module '@ember/template'
import { htmlSafe } from '@ember/template';
import FastBootService from 'ember-cli-fastboot/service';
import fetch from 'fetch';

import { makeBaseURL } from 'hunfencing/lib/api';

export default class Index extends Route {
  @service fastboot!: FastBootService;

  async model(params: { id: string }) {
    if (this.fastboot.isFastBoot) {
      return;
    }

    let baseURL = makeBaseURL('news');

    let response = await fetch(`${baseURL}/${params.id}`);
    let { data } = await response.json();

    let { id, attributes } = data;

    let content = htmlSafe(attributes.content);

    return {
      id,
      ...attributes,
      content
    };
  }
}
