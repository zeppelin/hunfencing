export interface IParamMapping {
  [key: string]: {
    paramName: string;
    values: Array<{
      [key: string]: string | number | {
        value: string | number;
        additionalParams: {
          [key: string]: string | number;
        }
      }
    }>
  };
}

const isObject = (o: unknown): boolean => typeof o === 'object' && o !== null;

export const mapParams = (params: Dict<string>, mappings: IParamMapping): Dict<string> => {
  let [mappedParams, additionalParams] = Object.entries(params).reduce((
    [mParams, aParams],
    [key, value]
  ) => {
    let mapping = mappings[key];

    let { paramName } = mapping;
    let paramValue = mapping.values[value];

    if (isObject(paramValue) && paramValue.value) {
      if (paramValue.additionalParams) {
        aParams = { ...aParams, ...paramValue.additionalParams };
      }

      paramValue = paramValue.value;
    }

    mParams[paramName] = paramValue;

    return [mParams, aParams];
  }, [{}, {}]);

  return { ...mappedParams, ...additionalParams };
};
