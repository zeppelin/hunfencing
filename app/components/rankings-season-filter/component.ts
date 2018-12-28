import { computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import Component from 'sparkles-component';

import { DEFAULT_SEASON } from 'hunfencing/controllers/rankings';

interface ISeason {
  name: string;
  value: Option<string>;
}

export default class RankingsSeasonFilter extends Component<{
  season: Option<string>
}> {
  @service router!: any;

  defaultSeason = DEFAULT_SEASON;

  // TODO extract this
  seasons = [
    { name: '2018/2019', value: DEFAULT_SEASON },
    { name: '2017/2018', value: '2017-2018' },
    { name: '2016/2017', value: '2016-2017' },
    { name: '2015/2016', value: '2015-2016' },
    { name: '2014/2015', value: '2014-2015' }
  ];

  @computed('args.season')
  get selectedSeason(): Maybe<ISeason> {
    return this.seasons.find(({ value }) => value === this.args.season );
  }

  select(season: string) {
    this.router.transitionTo({ queryParams: { season } });
  }

  @computed('args.season')
  get previousSeason(): Maybe<ISeason> {
    let index = this.seasons.findIndex(({ value }) => value === this.args.season);
    if (index < 0) {
      return;
    }

    return this.seasons[index + 1];
  }

  @computed('args.season')
  get nextSeason(): Maybe<ISeason> {
    let index = this.seasons.findIndex(({ value }) => value === this.args.season);
    if (index < 0) {
      return;
    }

    return this.seasons[index - 1];
  }
}
