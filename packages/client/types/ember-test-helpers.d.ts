declare module 'ember-test-helpers' {
  type FakeRequest = {
    async: boolean;
    errorFlag: boolean;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
    onabort: Function;
    onerror: Function;
    onload: Function;
    ontimeout: Function;
    params: { [key: string]: string };
    queryParams: { [key: string]: string };
    password?: 'string';
    readyState: 0 | 1 | 2 | 3 | 4;
    requestBody: string | null;
    requestHeaders: { [key: string]: string };
    responseHeaders: { [key: string]: string };
    responseText: string | null;
    responseXML: string | null;
    sendFlag: boolean;
    status: number;
    statusText: string;
    upload: any;
    url: string;
    username: undefined
  };

  type RouteHandlerCallback = (schema: any, request: FakeRequest)=> any;
  type RouteHandlerResponse = { [key: string]: string } | string | void;

  interface TestContext {
    server: {
      get(path: string, callback: RouteHandlerCallback): RouteHandlerResponse;
    };
  }
}
