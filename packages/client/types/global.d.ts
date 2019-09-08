declare module 'fetch' {
  export default function(url: string, options?: any): Promise<any>;
  export class AbortController {
    signal: any;
    abort: () => void;
  }
}
