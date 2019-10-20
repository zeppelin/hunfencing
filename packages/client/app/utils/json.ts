export const deserializeJSONAPIResponse = (response: any): any => {
  return response.data.map((record: any) => {
    return {
      id: record.id,
      ...record.attributes
    };
  });
};
