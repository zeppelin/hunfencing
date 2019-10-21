import 'jest';

import { serializeToJSONAPIFormat } from '../api';

test('exists', () => {
  let type = 'robots';
  let rows = [{
    id: '1',
    attr: 'Bender'
  }];

  let doc = {
    data: [{
      id: '1',
      type: 'robots',
      attributes: {
        attr: 'Bender'
      }
    }]
  };

  expect(serializeToJSONAPIFormat(type, rows)).toEqual(doc);
});
