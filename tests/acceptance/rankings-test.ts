import { click, visit } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import clearAllCookies from 'ember-cookies/clear-all-cookies';
import { setupApplicationTest } from 'ember-qunit';
import { TestContext } from 'ember-test-helpers';
import { module, test } from 'qunit';

import { handleRankings } from '../../mirage/handlers/rankings';

const assertSelectedCategory = (assert: Assert, value: string, text: string) => {
  assert.dom(`[data-test-category-filter="${value}"]`).hasClass('active');
};

const assertSelectedGender = (assert: Assert, value: string) => {
  assert.dom(`[data-test-gender-button="${value}"]`).hasClass('active');
};

const assertSelectedWeapon = (assert: Assert, value: string) => {
  assert.dom(`[data-test-weapon-button="${value}"]`).hasClass('active');
};

const assertSelectedSeason = (assert: Assert, value: string, text: string) => {
  assert.dom('[data-test-season-filter]').hasValue(value);
  assert.dom('[data-test-season-filter] option:checked').hasText(text);
};

module('Acceptance | rankings', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let intl: any;
  hooks.beforeEach(function(this: TestContext) {
    clearAllCookies();
    intl = this.owner.lookup('service:intl');
  });

  hooks.afterEach(function() {
    clearAllCookies();
  });

  module('filters', function(hooks) {
    test('gender', async function(assert) {
      await visit('/rankings');

      assertSelectedCategory(assert, 'senior', intl.t('category.senior'));
      assertSelectedGender(assert, 'f');
      assertSelectedWeapon(assert, 'e');
      assertSelectedSeason(assert, 'current', '2018/2019');

      await click('[data-test-gender-button="m"]');
      assertSelectedGender(assert, 'm');

      await click('[data-test-gender-button="f"]');
      assertSelectedGender(assert, 'f');
    });
  });

  module('query params', function(hooks) {
    test('blank state', async function(this: TestContext, assert) {
      assert.expect(8);

      this.server.get('/rankings', function() {
        assert.ok(true, 'API was hit');
        return handleRankings(...arguments);
      });

      await visit('/rankings');

      assert.currentUrl('/rankings', {
        gender: 'f',
        weapon: 'e'
      });

      assertSelectedCategory(assert, 'senior', intl.t('category.senior'));
      assertSelectedGender(assert, 'f');
      assertSelectedWeapon(assert, 'e');
      assertSelectedSeason(assert, 'current', '2018/2019');
    });

    test('from cookies', async function(assert) {
      assert.expect(8);

      this.server.get('/rankings', function() {
        assert.ok(true, 'API was hit');
        return handleRankings(...arguments);
      });

      let cookies = this.owner.lookup('service:cookies');
      cookies.write('rankings', JSON.stringify({
        category: 'junior',
        gender: 'm',
        weapon: 's'
      }));

      await visit('/rankings');

      assert.currentUrl('/rankings', {
        category: 'junior',
        gender: 'm',
        weapon: 's'
      });

      assertSelectedCategory(assert, 'junior', intl.t('category.junior'));
      assertSelectedGender(assert, 'm');
      assertSelectedWeapon(assert, 's');
      assertSelectedSeason(assert, 'current', '2018/2019');
    });

    test('from cookies, navigating back and forth', async function(assert) {
      assert.expect(9);

      this.server.get('/rankings', function() {
        assert.ok(true, 'API was hit');
        return handleRankings(...arguments);
      });

      let cookies = this.owner.lookup('service:cookies');
      cookies.write('rankings', JSON.stringify({
        category: 'junior',
        gender: 'm',
        weapon: 's'
      }));

      await visit('/rankings');
      await click('[data-test-header-link="home"]');
      await click('[data-test-header-link="rankings"]');

      assert.currentUrl('/rankings', {
        category: 'junior',
        gender: 'm',
        weapon: 's'
      });

      assertSelectedCategory(assert, 'junior', intl.t('category.junior'));
      assertSelectedGender(assert, 'm');
      assertSelectedWeapon(assert, 's');
      assertSelectedSeason(assert, 'current', '2018/2019');
    });
  });
});
