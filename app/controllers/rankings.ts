import { service } from '@ember-decorators/service';
import Controller from '@ember/controller';
import { schedule } from '@ember/runloop';
import FastBoot from 'ember-cli-fastboot/service';
import { serializeQueryParams } from 'ember-fetch/utils/serialize-query-params';
import QueryParams from 'ember-parachute';
import fetch from 'fetch';

const DEFAULT_CATEGORY = 'senior';
const DEFAULT_GENDER = 'f';
const DEFAULT_WEAPON = 'e';
const DEFAULT_SEASON = 'current';

const queryParams = new QueryParams({
  category: {
    refresh: true,
    defaultValue: DEFAULT_CATEGORY
  },
  gender: {
    refresh: true,
    defaultValue: null
  },
  weapon: {
    refresh: true,
    defaultValue: null
  },
  season: {
    refresh: true,
    defaultValue: DEFAULT_SEASON
  }
});

type TQueryParams = {
  category: Option<string>;
  gender: Option<string>;
  weapon: Option<string>;
  season: Option<string>;
};

export default class Rankings extends Controller.extend(queryParams.Mixin) {
  @service fastboot!: FastBoot;
  @service cookies!: any;
  @service router!: any;

  isLoading = false;
  rankings?: Ranking[];

  async setup({ queryParams }: { queryParams: TQueryParams }) {
    if (this.fastboot.isFastBoot) {
      return;
    }

    let params = this.buildParams(queryParams);

    if (this.isDefaultParams(params)) {
      let savedParams = this.readSavedParams();
      if (savedParams) {
        params = {
          ...this.defaultParams,
          ...savedParams
        };
      }
    }

    this.handleQueryParams(queryParams, params);
  }

  async queryParamsDidChange({ queryParams }: { queryParams: TQueryParams }) {
    let params = this.buildParams(queryParams);
    this.handleQueryParams(queryParams, params);
  }

  // @ts-ignore TS7006
  reset(_queryParamsChangedEvent, isExiting: boolean) {
    if (isExiting) {
      // @ts-ignore TS2339
      this.resetQueryParams();
    }
  }

  private handleQueryParams(queryParams: any, params: TQueryParams) {
    if (this.isTransitionSettled(queryParams, params)) {
      this.updateModel(params);
    } else {
      schedule('afterRender', () => {
        this.router.replaceWith({ queryParams: params });
      });
    }
  }

  private async updateModel(params: TQueryParams) {
    let { category, gender, weapon, season } = params;
    this.cookies.write('rankings', JSON.stringify({ category, gender, weapon }));

    this.set('isLoading', true);

    try {
      let baseURL = 'http://localhost:4200/api/rankings';
      let qps = serializeQueryParams({ gender, weapon, category, season });

      let url = `${baseURL}?${qps}`

      console.info('fetching data...', params);

      let response = await fetch(url);
      let data = await response.json();

      this.set('rankings', data);
    } finally {
      this.set('isLoading', false);
    }
  }

  private buildParams(params: TQueryParams): TQueryParams {
    let { category, gender, weapon, season } = params;

    return {
      category: category || DEFAULT_CATEGORY,
      gender: gender || DEFAULT_GENDER,
      weapon: weapon || DEFAULT_WEAPON,
      season: season || DEFAULT_SEASON
    };
  }

  private isDefaultParams(queryParams: TQueryParams): boolean {
    let { category, gender, weapon, season } = queryParams;
    return category === DEFAULT_CATEGORY
        && gender === DEFAULT_GENDER
        && weapon === DEFAULT_WEAPON
        && season === DEFAULT_SEASON;
  }

  private readSavedParams(): Maybe<Dict<string>> {
    let cookieValue: string | undefined = this.cookies.read('rankings');
    if (cookieValue) {
      try {
        return JSON.parse(cookieValue);
      } catch(e) {}
    }
  }

  private isTransitionSettled(queryParams: TQueryParams, params: TQueryParams): boolean {
    return JSON.stringify(queryParams) === JSON.stringify(params);
  }

  private get defaultParams(): TQueryParams {
    return {
      category: DEFAULT_CATEGORY,
      gender: DEFAULT_GENDER,
      weapon: DEFAULT_WEAPON,
      season: DEFAULT_SEASON
    };
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'rankings': Rankings;
  }
}
