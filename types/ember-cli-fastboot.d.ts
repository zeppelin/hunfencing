declare module 'ember-cli-fastboot/service' {
  interface FastBootService {
    isFastBoot: boolean;
    [key: string]: any;
  }

  export default FastBootService
}
