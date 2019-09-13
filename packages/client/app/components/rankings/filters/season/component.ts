import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { DEFAULT_SEASON } from '@hunfencing/client/controllers/rankings';

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
    { name: '2019/2020', value: DEFAULT_SEASON },
    { name: '2018/2019', value: '2018-2019' },
    { name: '2017/2018', value: '2017-2018' },
    { name: '2016/2017', value: '2016-2017' },
    { name: '2015/2016', value: '2015-2016' },
    { name: '2014/2015', value: '2014-2015' }
  ];

  get selectedSeason(): Maybe<ISeason> {
    return this.seasons.find(({ value }) => value === this.args.season );
  }

  selectNext() {
    if (this.nextSeason) {
      this.router.transitionTo({
        queryParams: {
          season: this.nextSeason.value
        }
      });
    }
  }

  selectPrevious() {
    if (this.previousSeason) {
      this.router.transitionTo({
        queryParams: {
          season: this.previousSeason.value
        }
      });
    }
  }

  get previousSeason(): Maybe<ISeason> {
    let index = this.seasons.findIndex(({ value }) => value === this.args.season);
    if (index < 0) {
      return;
    }

    return this.seasons[index + 1];
  }

  get nextSeason(): Maybe<ISeason> {
    let index = this.seasons.findIndex(({ value }) => value === this.args.season);
    if (index < 0) {
      return;
    }

    return this.seasons[index - 1];
  }
}
