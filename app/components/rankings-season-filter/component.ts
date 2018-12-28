import { service } from '@ember-decorators/service';
import Component from 'sparkles-component';

import { DEFAULT_SEASON } from 'hunfencing/controllers/rankings';

export default class RankingsSeasonFilter extends Component {
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

  select(season: string) {
    this.router.transitionTo({ queryParams: { season } });
  }
}
