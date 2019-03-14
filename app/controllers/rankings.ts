import { service } from '@ember-decorators/service';
import Controller from '@ember/controller';
import { schedule } from '@ember/runloop';
import FastBoot from 'ember-cli-fastboot/service';
import { serializeQueryParams } from 'ember-fetch/utils/serialize-query-params';
// @ts-ignore: ember-parachute is still not playing nicely with TypeScript
import { queryParam } from 'ember-parachute/decorators';
import fetch, { AbortController } from 'fetch';

import ENV from 'hunfencing/config/environment';
import IRanking from 'hunfencing/models/ranking';

const DEFAULT_CATEGORY = 'senior';
const DEFAULT_GENDER = 'f';
const DEFAULT_WEAPON = 'e';
export const DEFAULT_SEASON = '2018-2019';

interface IQueryParams {
  category: Option<string>;
  gender: Option<string>;
  weapon: Option<string>;
  season: Option<string>;
}

export default class Rankings extends Controller {
  @service fastboot!: FastBoot;
  @service cookies!: any;
  @service router!: any;

  @queryParam({ refresh: true }) category: IQueryParams['category'] = DEFAULT_CATEGORY;
  @queryParam({ refresh: true }) gender: IQueryParams['gender'] = null;
  @queryParam({ refresh: true }) weapon: IQueryParams['weapon'] = null;
  @queryParam({ refresh: true }) season: IQueryParams['season'] = DEFAULT_SEASON;

  isLoading = false;
  loadError = false;
  rankings?: IRanking[];

  abortController: AbortController = new AbortController();

  async setup({ queryParams }: { queryParams: IQueryParams }) {
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

  async queryParamsDidChange({ queryParams }: { queryParams: IQueryParams }) {
    let params = this.buildParams(queryParams);
    this.handleQueryParams(queryParams, params);
  }

  reset(_queryParamsChangedEvent: unsafe, isExiting: boolean) {
    if (isExiting) {
      // @ts-ignore: ember-parachute is still not playing nicely with TypeScript
      this.resetQueryParams();
    }
  }

  private handleQueryParams(queryParams: any, params: IQueryParams) {
    if (this.isTransitionSettled(queryParams, params)) {
      this.updateModel(params);
    } else {
      schedule('afterRender', () => {
        this.router.replaceWith({ queryParams: params });
      });
    }
  }

  private async updateModel(params: IQueryParams) {
    let { category, gender, weapon, season } = params;
    this.cookies.write('rankings', JSON.stringify({ category, gender, weapon }));

    this.abortController.abort(); // Abort the previous request
    this.set('loadError', false);
    this.set('isLoading', true);

    this.abortController = new AbortController();
    let { signal } = this.abortController;

    try {
      let { protocol, host } = window.location;
      let apiHost = ENV.hunfencing.apiHost || host;
      let baseURL = `${protocol}//${apiHost}/api/rankings`;

      let qps = serializeQueryParams({ gender, weapon, category, season });

      let url = `${baseURL}?${qps}`;

      // tslint:disable-next-line: no-console
      console.info('fetching data...', params);

      let response = await fetch(url, { signal });
      let { data } = await response.json();

      this.set('rankings', data.map(({ attributes }: { attributes: Dict<unknown> }) => attributes));
    } catch (err) {
      if (err.name !== 'AbortError') {
        this.set('loadError', true);
        throw err;
      }
    } finally {
      this.set('isLoading', false);
    }
  }

  private buildParams(params: IQueryParams): IQueryParams {
    let { category, gender, weapon, season } = params;

    return {
      category: category || DEFAULT_CATEGORY,
      gender: gender || DEFAULT_GENDER,
      weapon: weapon || DEFAULT_WEAPON,
      season: season || DEFAULT_SEASON
    };
  }

  private isDefaultParams(queryParams: IQueryParams): boolean {
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
        // tslint:disable-next-line: no-empty
      } catch (e) {}
    }
  }

  private isTransitionSettled(queryParams: IQueryParams, params: IQueryParams): boolean {
    return JSON.stringify(queryParams) === JSON.stringify(params);
  }

  private get defaultParams(): IQueryParams {
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
