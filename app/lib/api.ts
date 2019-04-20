import ENV from 'hunfencing/config/environment';

export const makeBaseURL = (resourceName: string): string => {
  let { protocol, host } = window.location;
  let apiHost = ENV.hunfencing.apiHost || host;

  return `${protocol}//${apiHost}/api/${resourceName}`;
};
