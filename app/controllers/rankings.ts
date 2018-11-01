import { service } from '@ember-decorators/service';
import Controller from '@ember/controller';
import FastBoot from 'ember-cli-fastboot/service';
import QueryParams from 'ember-parachute';
import fetch from 'fetch';

const queryParams = new QueryParams({
  category: {
    refresh: true,
    defaultValue: 'senior'
  },
  gender: {
    refresh: true,
    defaultValue: 'f'
  },
  weapon: {
    refresh: true,
    defaultValue: 'e'
  },
  season: {
    refresh: true,
    defaultValue: 'current'
  }
});

export default class Rankings extends Controller.extend(queryParams.Mixin) {
  @service fastboot!: FastBoot;

  isLoading = false;

  async setup({ queryParams }: { queryParams: any }) {
    this.updateModel(queryParams);
  }

  async queryParamsDidChange({ shouldRefresh, queryParams }: { shouldRefresh: boolean, queryParams: any }) {
    // if any query param with `refresh: true` is changed, `shouldRefresh` is `true`
    this.updateModel(queryParams);
  }

  async updateModel(queryParams: any) {
    if (!this.fastboot.isFastBoot) {
      let { gender, weapon, category, season } = queryParams;

      this.set('isLoading', true);

      try {
        let url = `http://localhost:4200/api/rankings?gender=${gender}&weapon=${weapon}&category=${category}&season=${season}`;
        let response = await fetch(url);
        let data = await response.json();

        this.set('model', data);
      } finally {
        this.set('isLoading', false);
      }
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'rankings': Rankings;
  }
}
