import * as queryString from 'query-string';

import { serializeAttributes } from './attributes';
import { mapParams } from './params';

export const formatURL = (baseURL: string, params: Dict<string>, mappings: Dict<any>): string => {
  return baseURL + '&' + queryString.stringify(mapParams(params, mappings));
};

export const serializeToJSONAPIFormat = (
  type: string,
  rows: Array<Dict<unknown>>,
  attributeMappings: Dict<Dict<unknown>>
) => {
  let data = rows.map((row) => {
    // TODO: any -> T
    let attributes: any = serializeAttributes(row, attributeMappings);
    let id = attributes.id || null;
    delete attributes.id;

    return {
      id,
      type,
      attributes
    };
  });

  return {
    data
  };
};
