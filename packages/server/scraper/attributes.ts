export const serializeAttributes = (attributes: Dict<unsafe>, mappings: Dict<Dict<unknown>>) => {
  return Object.entries(attributes).reduce((acc, [key, value]) => {
    if (key !== 'id') {
      let mapping = mappings[key];

      if (mapping && mapping[value]) {
        acc[key] = mapping[value];
      } else {
        acc[key] = value;
      }
    }

    return acc;
  }, {});
};
