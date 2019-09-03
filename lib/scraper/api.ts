import * as queryString from 'query-string';

import { serializeAttributes } from './attributes';
import { mapParams } from './params';

export const formatURL = (baseURL: string, params: Dict<string>, mappings: Dict<any>): string => {
  return baseURL + '&' + queryString.stringify(mapParams(params, mappings));
};

export const serializeToJSONAPIFormat = (
  type: string,
  rows: Array<Dict<any>>,
  attributeMappings: Dict<Dict<unknown>>
) => {
  let data = rows.map((row) => {
    let attributes = serializeAttributes(row, attributeMappings);

    return {
      id: null, // TODO: extract id from fencer profile URL
      type,
      attributes
    };
  });

  return {
    data
  };
};
