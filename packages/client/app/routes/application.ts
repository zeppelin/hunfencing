import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from '@hunfencing/client/config/environment';
import { pick as pickAcceptLanguage } from 'accept-language-parser';
import FastBootService from 'ember-cli-fastboot/service';

const { defaultLocale } = ENV.hunfencing;

export default class Application extends Route {
  @service moment!: any;
  @service intl!: any;
  @service cookies!: unsafe;
  @service fastboot!: FastBootService;

  beforeModel() {
    this.setupLocale();
  }

  setupLocale() {
    // Remove `global` locale, since it is only used as a fallback for all
    // languages
    let locales = (this.intl.locales as string[]).filter((locale) => locale !== 'global');
    let locale: Maybe<string>;

    // See if the request (or response, in case when we're on the client)
    // already contains the locale in a cookie
    if (this.fastboot.isFastBoot) {
      let fastbootCookies = this.fastboot.get('request.cookies');
      locale = fastbootCookies.locale;
    } else {
      locale = this.cookies.read('locale');
    }

    // Try to figure out the best match for the user's preference
    if (!locale) {
      if (this.fastboot.isFastBoot) {
        // `Maybe<string>`: just in case the browser refuses to report Accept-Language...
        let acceptLanguage: Maybe<string> = this.fastboot.get('request.headers').get('accept-language');
        if (acceptLanguage) {
          locale = pickAcceptLanguage(locales, acceptLanguage, { loose: true });
        }
      } else {
        // This is really poor way of detecting the locale, but the case where
        // FastBoot failed (Or it didn't have the info to determine) and just
        // served the index.html without setting any cookie above must be
        // considered
        locale = window.navigator.language.slice(0, 2);
      }
    }

    // It could still be missing or invalid
    if (!locale || !locales.includes(locale)) {
      locale = defaultLocale;
    }

    this.intl.setLocale([locale, 'global']);
    this.moment.setLocale(locale);
    this.cookies.write('locale', locale);
  }
}
